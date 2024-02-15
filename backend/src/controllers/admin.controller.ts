import workshop from "../models/workshop"
import { checkSubscriptions, convertToOrganizer, deleteWork, errcheck, msgFromMongoDb } from "../helpers/db.helper"
import { msgResponse, redirectResponse, status, statusResponse } from "../helpers/response.helper"
import user from "../models/user"
import recovery from "../models/recovery"
import interaction from "../models/interaction"
import subscription from "../models/subscription"
import message from "../models/message"
import { userController } from "./user.controller"
import { checkImage, checkParams, cleanupProfile } from "../helpers/request.helper"
import fs from 'fs'
import { workerData } from "worker_threads"

export class adminController
{
    static getUser(req,res)
    {
        user.find(errcheck(res,(users)=>
        {
            res.json(status(users,200))
        }))
    }

    static patchUser(req,res)
    {
        if(checkParams(req.body,['_id'],res))
        {
            user.findById(req.body._id,(err,result)=>
            {
                if(checkParams(req.body,['firstName','lastName','username','phone','email'],res))
                {
                    if(result.role=='organizer')
                    {
                        user.updateOne({_id: result._id},{
                            firstName:req.body.firstName, 
                            lastName:req.body.lastName, 
                            username:req.body.username, 
                            phone:req.body.phone, 
                            email:req.body.email,
                            orgName:req.body.orgName,
                            address:req.body.address,
                            orgId:req.body.orgId
                        },{runValidators: true},(err,result) => 
                        {
                            if(err)
                            {
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
                            }
                            else
                            {
                                if(result.acknowledged && result.modifiedCount == 1)
                                {
                                    user.findById(result._id,(err,user)=>{
                                        if(err)
                                        {
                                            console.log(err)
                                            statusResponse(res,500)
                                        }
                                        else
                                        {
                                            msgResponse(res,200,'Uspesno azuriranje profila')
                                        }  
                                    })
                                }
                                else
                                {
                                    msgResponse(res,400,'Profil nije azuriran')
                                }
                            }
                        })
                    }
                    else
                    {
                        user.updateOne({_id: result._id},{
                            firstName:req.body.firstName, 
                            lastName:req.body.lastName, 
                            username:req.body.username, 
                            phone:req.body.phone, 
                            email:req.body.email
                        },{runValidators: true},(err,result) => 
                        {
                            if(err)
                            {
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
                            }
                            else
                            {
                                if(result.acknowledged && result.modifiedCount == 1)
                                {
                                    user.findById(result._id,(err,user)=>{
                                        if(err)
                                        {
                                            console.log(err)
                                            statusResponse(res,500)
                                        }
                                        else
                                        {
                                            msgResponse(res,200,'Uspesno azuriranje profila')
                                        }  
                                    })
                                }
                                else
                                {
                                    msgResponse(res,400,'Profil nije azuriran')
                                }
                            }
                        })
                    }
                }
                else
                {
                }
            })
        }
    }

    static postPicture(req,res)
    {
        if(req.file)
        {
            checkImage(req)
            let path = req.file.filename
            user.updateOne({_id:req.body._id},{picture:path},{runValidators: true},(err,result)=>{
                if(err)
                {
                    cleanupProfile(req)
                    msgFromMongoDb(err,res)
                }
                else
                {
                    msgResponse(res,200,'Uspesno azuriranje profilne slike')
                }
            })
        }
        else if(req.body.delete=='true')
        {
            user.updateOne({_id:req.body._id},{ $unset: { picture: 1 } },{runValidators: true},(err,result)=>{
                if(err)
                {
                    msgFromMongoDb(err,res)
                }
                else
                {
                    msgResponse(res,200,'Profilna slika uspesno uklonjena')
                }
            })
        }
        else
        {
            msgResponse(res,400,'Slika nije u validnom formatu')
        }
    }

    static deleteUser(req,res)
    {
        user.deleteOne({_id: req.body._id},(cnt)=>{})
        recovery.deleteMany({user: req.body._id},(cnt)=>{})
        interaction.deleteMany({user: req.body._id},(cnt)=>{})
        subscription.deleteMany({user: req.body._id},(cnt)=>{checkSubscriptions()})
        message.deleteMany({user: req.body._id},(cnt)=>{})
        workshop.find({organizer: req.body._id},errcheck(res,(workshops)=>
        {
            for(let w of workshops)
            {
                deleteWork(w._id)
            }
            msgResponse(res,200,'Korisnik uspesno obrisan')
        }))
    }

    static patchRequest(req,res)
    {
        user.updateOne({username: req.body.username}, {status: req.body.status}, {runValidators: true},(err,result)=>{
            if(err)
            {
                msgFromMongoDb(err,res)
            }
            else
            {
                if(result.acknowledged && result.modifiedCount == 1)
                {
                    msgResponse(res,200,'Uspesna promena stanja')
                }
                else
                {
                    msgResponse(res,400,'Stanje nije promenjeno')
                }
            }
        })
    }

    static getWorkshop(req,res)
    {
        workshop.find().populate('organizer').exec(errcheck(res,(users)=>
        {
            res.json(status(users,200))
        }))
    }

    static async postWorkshop(req,res)
    {
      req.body = JSON.parse(req.body.json)
      let newint = new workshop()
      newint.title=req.body.title
      newint.titlePicture=req.file.filename
      newint.date=req.body.date
      newint.location=req.body.location
      newint.shortDesc=req.body.shortDesc
      newint.longDesc=req.body.longDesc
      newint.gallery=req.body.gallery
      newint.totalSpaces=req.body.totalSpaces
      newint.organizer=req.body.organizer
      newint.status="active"
      newint.save().then(rec => {
          redirectResponse(res,'/admin/workshop')
      }).catch(err => {
          msgFromMongoDb(err,res)
      })
      convertToOrganizer(req.body.organizer)
    }

    static patchWorkshop(req,res)
    {
        req.body = JSON.parse(req.body.json)
        if(req.file)
        {
            workshop.updateOne({_id: req.body._id},{
                title:req.body.title, 
                titlePicture:req.file.filename, 
                date:req.body.date, 
                location:req.body.location, 
                shortDesc:req.body.shortDesc,
                longDesc:req.body.longDesc,
                gallery:req.body.gallery,
                totalSpaces:req.body.totalSpaces,
                organizer:req.body.organizer._id,
            },{runValidators: true},(err,result) => 
            {
                if(err)
                {
                    msgFromMongoDb(err,res)
                }
                else
                {
                    if(result.acknowledged && result.modifiedCount == 1)
                    {
                        msgResponse(res,200,'Uspesno azuriranje radionice')
                    }
                    else
                    {
                        msgResponse(res,400,'Radionica nije azurirana')
                    }
                }
            })
        }
        else
        {
            workshop.updateOne({_id: req.body._id},{
                title:req.body.title, 
                date:req.body.date, 
                location:req.body.location, 
                shortDesc:req.body.shortDesc,
                longDesc:req.body.longDesc,
                gallery:req.body.gallery,
                totalSpaces:req.body.totalSpaces,
                organizer:req.body.organizer._id,
            },{runValidators: true},(err,result) => 
            {
                if(err)
                {
                    msgFromMongoDb(err,res)
                }
                else
                {
                    if(result.acknowledged && result.modifiedCount == 1)
                    {
                        msgResponse(res,200,'Uspesno azuriranje radionice')
                    }
                    else
                    {
                        msgResponse(res,400,'Radionica nije azurirana')
                    }
                }
            })
        }
    }

    static deleteWorkshop(req,res)
    {
        deleteWork(req.body._id)
        msgResponse(res,200,'Radionica uspesno obrisana')
    }

    static async patchSugestion(req,res)
    {
        workshop.updateOne({_id: req.body.id}, {status: req.body.status}, {runValidators: true},(err,result)=>{
            if(err)
            {
                msgFromMongoDb(err,res)
            }
            else
            {
                if(result.acknowledged && result.modifiedCount == 1)
                {
                    msgResponse(res,200,'Uspesna promena stanja')
                }
                else
                {
                    msgResponse(res,400,'Stanje nije promenjeno')
                }
            }
        })
        if(req.body.status=="active")
        {
        let w = await workshop.findById(req.body.id)
        convertToOrganizer(w.organizer)
        }
    }

    static async getValid(req,res)
    {
        let list = []
        let users = await user.find({status:"active", role:{$in:['participant','organizer']}})
        let workshops = await workshop.find({ date: {$gte:Date.now()}, status: 'active' })
        let workshopids = []
        for(let workshop of workshops)
        {
            workshopids.push(workshop._id)
        }
        for(let user of users)
        {
            let cnt = await subscription.count({user:user._id,workshop:{$in:workshopids},type:{$in:['reservation','participation']}})
            if(cnt==0)
            {
                list.push(user)
            }
        }
        res.json(status(list,200))
    }
}
