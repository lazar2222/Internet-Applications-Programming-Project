import user from '../models/user'
import recovery from '../models/recovery'
import { checkImage, checkParams, cleanupProfile, generateKey } from '../helpers/request.helper'
import { errcheck, msgFromMongoDb } from '../helpers/db.helper'
import { msgResponse, redirectResponse, statusResponse } from '../helpers/response.helper'
import { sendRecoveryEmail } from './mailer'

export class identityController
{
    static loginRole(roles)
    {
        return (req,res)=>this.login(req,res,roles)
    }

    static login(req,res,roles)
    {
        if(checkParams(req.body,['username','password'],res))
        {
            user.findOne({username: req.body.username, password: req.body.password, role: { $in: roles }},errcheck(res,(user)=>
            {
                if(!user)
                {
                    msgResponse(res,400,'Pogresno korisnicko ime ili lozinka')
                }
                else if(user.status=='pending')
                {
                    msgResponse(res,400,'Zahtev za registraciju jos uvek nije odobren')
                }
                else if(user.status=='inactive')
                {
                    msgResponse(res,400,'Zahtev za registraciju je odbijen')
                }
                else if(user.status=='active')
                {   
                    req.session.user = user
                    if(user.role=='admin')
                    {
                        redirectResponse(res, '/admin/user')
                    }
                    else
                    {
                        redirectResponse(res, '/profile')   
                    }
                }
                else
                {
                    statusResponse(res,500)
                }
            }))
        }
    }

    static registerWithStatus(status)
    {
        return (req,res)=>this.register(req,res,status)
    }

    static register(req,res,status)
    {
        req.body = JSON.parse(req.body.json)
        if(checkParams(req.body,['firstName','lastName','username','password','repeatpassword','phone','email','organizer'],res))
        {
            let newuser = new user()
            newuser.firstName = req.body.firstName
            newuser.lastName = req.body.lastName
            newuser.username = req.body.username
            if(req.body.password == req.body.repeatpassword)
            {
                newuser.password = req.body.password
            }
            else
            {
                msgResponse(res,400,'Lozinke se ne podudaraju')
                cleanupProfile(req)
                return
            } 
            newuser.phone = req.body.phone
            newuser.email = req.body.email
            newuser.role = req.body.organizer ? 'organizer' : 'participant'
            newuser.status = status
            if(req.body.orgName && req.body.organizer) newuser.orgName = req.body.orgName
            if(req.body.address && req.body.organizer) newuser.address = req.body.address
            if(req.body.orgId && req.body.organizer) newuser.orgId = req.body.orgId
            if(req.file)
            {
                checkImage(req)
                newuser.picture = req.file.filename
            }
            if(!req.file && req.body.picture)
            {
                msgResponse(res,400,'Slika nije validna')
                return
            }
            newuser.save().then(rec => {
                if(status=='pending'){
                redirectResponse(res,'/register/success')
                }
                else
                {
                    redirectResponse(res,'/admin/user')
                }
            }).catch(err => {
                cleanupProfile(req)
                if(err.code == 11000 && err.keyPattern.username == 1)
                {
                    msgResponse(res,400,'Korisnicko ime je zauzeto')
                }
                else if(err.code == 11000 && err.keyPattern.email == 1)
                {
                    msgResponse(res,400,'Email je zauzet')
                }
                else
                {
                    msgFromMongoDb(err,res)
                }
            })
        }
    }

    static postBeginrecovery(req,res)
    {
        if(checkParams(req.body,['email'],res))
        {
            user.findOne({email: req.body.email},errcheck(res,(user)=>
            {
                if(user)
                {
                    let key = generateKey()
                    let rec = new recovery({user: user._id, key:key, date:Date.now()})
                    rec.save().then(rec => {
                        sendRecoveryEmail(user.email,key,res)
                    }).catch(err => {
                        if(err.code == 11000 && err.keyPattern.user == 1)
                        {
                            msgResponse(res,400,'Zahtev za ovog korisnika vec postoji')
                        }
                        else
                        {
                            console.log(err)
                            statusResponse(res,500)
                        }
                    })
                }
                else
                {
                    msgResponse(res,200,'Ukoliko je e-mail adresa ispravna, na nju je poslat mail sa instrukcijama')
                }
            }))
        }
    }

    static postFinishrecovery(req,res)
    {
        if(checkParams(req.body,['key','password','repeatpassword'],res))
        {
            if(req.body.password != req.body.repeatpassword)
            {
                msgResponse(res,400,'Lozinke se ne podudaraju')
            }
            else
            {
                recovery.findOne({key:req.body.key}).populate('user').exec(errcheck(res,(recovery) =>{
                    if(recovery && recovery.user)
                    {
                        user.updateOne({username: recovery.user.username}, {password: req.body.password}, {runValidators: true},(err,result)=>{
                            if(err)
                            {
                                msgFromMongoDb(err,res)
                            }
                            else
                            {
                                recovery.delete().then(rec => {
                                    redirectResponse(res, '/recover/success')
                                }).catch(err => {
                                        console.log(err)
                                        statusResponse(res,500)
                                })
                            }
                        })
                    }
                    else
                    {
                        msgResponse(res,400,'Kljuc nije validan')
                    }
                }))
            }
        }
    }
}
