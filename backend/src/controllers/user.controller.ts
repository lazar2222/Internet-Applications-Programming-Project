import { msgFromMongoDb } from '../helpers/db.helper'
import { checkImage, checkParams, cleanupProfile } from '../helpers/request.helper'
import user from '../models/user'
import { msgResponse, redirectResponse, status, statusResponse } from '../helpers/response.helper'
import fs from 'fs'
import interaction from '../models/interaction'
import mongoose from 'mongoose'
import message from '../models/message'

export class userController
{
    static postLogout(req,res)
    {
        delete req.session.user
        redirectResponse(res,'/')
    }

    static patchPassword(req,res)
    {
        if(checkParams(req.body,['oldpassword','password','repeatpassword'],res))
        {
            if(req.body.oldpassword != req.session.user.password)
            {
                msgResponse(res,400,'Stara lozinka nije tacna')
            }
            else if(req.body.password != req.body.repeatpassword)
            {
                msgResponse(res,400,'Lozinke se ne podudaraju')
            }
            else
            {
                user.updateOne({username: req.session.user.username}, {password: req.body.password}, {runValidators: true},(err,result)=>{
                    if(err)
                    {
                        msgFromMongoDb(err,res)
                    }
                    else
                    {
                        delete req.session.user
                        redirectResponse(res,'/')
                    }
                })
            }
        }
    }

    static getMyProfile()
    {
        return (req,res) => {this.getProfile(req,res,req.session.user._id)}
    }

    static getProfile(req,res,id)
    {
        user.findOne({_id: id}, 'firstName lastName username phone email orgName address orgId picture role', (err, profile) => {
            if (err)
            {
                console.log(err)
                statusResponse(res,500)
            }
            else
            {
                res.json(status(profile,200))
            }
        })
    }

    static postProfile(req,res)
    {
        if(checkParams(req.body,['firstName','lastName','username','phone','email'],res))
        {
            if(req.session.user.role=='organizer')
            {
                user.updateOne({_id: req.session.user._id},{
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
                            user.findById(req.session.user._id,(err,user)=>{
                                if(err)
                                {
                                    console.log(err)
                                    statusResponse(res,500)
                                }
                                else
                                {
                                    req.session.user = user
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
                user.updateOne({_id: req.session.user._id},{
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
                            user.findById(req.session.user._id,(err,user)=>{
                                if(err)
                                {
                                    console.log(err)
                                    statusResponse(res,500)
                                }
                                else
                                {
                                    req.session.user = user
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
    }

    static postPicture(req,res)
    {
        if(req.file)
        {
            checkImage(req)
            let path = req.file.filename
            user.updateOne({_id:req.session.user._id},{picture:path},{runValidators: true},(err,result)=>{
                if(err)
                {
                    cleanupProfile(req)
                    msgFromMongoDb(err,res)
                }
                else
                {
                    if(req.session.user.picture)
                    {
                        fs.unlinkSync('files/profile/'+req.session.user.picture)
                    }
                    req.session.user.picture=path
                    msgResponse(res,200,'Uspesno azuriranje profilne slike')
                }
            })
        }
        else if(req.body.delete=='true')
        {
            user.updateOne({_id:req.session.user._id},{ $unset: { picture: 1 } },{runValidators: true},(err,result)=>{
                if(err)
                {
                    msgFromMongoDb(err,res)
                }
                else
                {
                    if(req.session.user.picture)
                    {
                        fs.unlinkSync('files/profile/'+req.session.user.picture)
                    }
                    delete req.session.user.picture
                    msgResponse(res,200,'Profilna slika uspesno uklonjena')
                }
            })
        }
        else
        {
            msgResponse(res,400,'Slika nije u validnom formatu')
        }
    }

    static getInteraction(req,res)
    {
        interaction.aggregate([
            {
              '$match': {
                'user': new mongoose.Types.ObjectId(req.session.user._id),
                'comment': {$ne:null}
              }
            }, {
              '$lookup': {
                'from': 'workshops',
                'localField': 'workshop',
                'foreignField': 'title',
                'as': 'workshop'
              }
            }, {
              '$unwind': {
                'path': '$workshop'
              }
            }, {
              '$addFields': {
                'title': '$workshop.title',
                'titlePicture': '$workshop.titlePicture',
                'date': '$workshop.date',
                'location': '$workshop.location',
                'shortDesc': '$workshop.shortDesc'
              }
            }, {
              '$project': {
                'workshop': 0,
                'user': 0
              }
            }
          ], (err, comments) => {
            if (err)
            {
                console.log(err)
                statusResponse(res,500)
            }
            else
            {
                interaction.aggregate([
                    {
                      '$match': {
                        'user': new mongoose.Types.ObjectId(req.session.user._id),
                        'comment': null
                      }
                    }, {
                      '$lookup': {
                        'from': 'workshops',
                        'localField': 'workshop',
                        'foreignField': 'title',
                        'as': 'workshop'
                      }
                    }, {
                      '$unwind': {
                        'path': '$workshop'
                      }
                    }, {
                      '$addFields': {
                        'title': '$workshop.title',
                        'titlePicture': '$workshop.titlePicture',
                        'date': '$workshop.date',
                        'location': '$workshop.location',
                        'shortDesc': '$workshop.shortDesc'
                      }
                    }, {
                      '$project': {
                        'workshop': 0,
                        'user': 0
                      }
                    }
                  ], (err, likes) => {
                    if (err)
                    {
                        console.log(err)
                        statusResponse(res,500)
                    }
                    else
                    {
                        res.json(status({likes:likes,comments:comments},200))
                    }
                })
            }
        })
    }

    static postInteraction(req,res)
    {
        let newint = new interaction()
        newint.user=req.session.user._id;
        newint.workshop=req.body.workshop;
        newint.comment=req.body.comment;
        newint.date=Date.now()
        newint.save().then(rec => {
            msgResponse(res,200,'Interakcija uspesno dodata')
        }).catch(err => {
            msgFromMongoDb(err,res)
        })
    }

    static patchInteraction(req,res)
    {
        interaction.updateOne({_id: req.body._id},{comment:req.body.comment}, {runValidators: true},(err,result)=>{
            if(err)
            {
                msgFromMongoDb(err,res)
            }
            else
            {
                if(result.acknowledged && result.modifiedCount == 1)
                {
                    msgResponse(res,200,'Uspesna promena komentara')
                }
                else
                {
                    msgResponse(res,400,'Komentar nije promenjen')
                }
            }
        })
    }

    static deleteInteraction(req,res)
    {
        interaction.deleteOne({_id: req.body._id},(cnt)=>{
            msgResponse(res,200,'Interakcija uspesno obrisana')
        })
    }

    static getMessage(req,res)
    {
        message.aggregate([
            {
              '$match': {
                'user': new mongoose.Types.ObjectId(req.session.user._id),
              }
            }, {
              '$sort': {
                'date': 1
              }
            }, {
              '$group': {
                '_id': {
                  'user': '$user',
                  'workshop': '$workshop'
                },
                'messages': {
                  '$push': {
                    'direction': '$direction',
                    'date': '$date',
                    'text': '$text'
                  }
                }
              }
            }, {
              '$lookup': {
                'from': 'users',
                'localField': '_id.user',
                'foreignField': '_id',
                'as': 'user'
              }
            }, {
              '$unwind': {
                'path': '$user'
              }
            }, {
              '$lookup': {
                'from': 'workshops',
                'localField': '_id.workshop',
                'foreignField': '_id',
                'as': 'workshop'
              }
            }, {
              '$unwind': {
                'path': '$workshop'
              }
            }, {
              '$lookup': {
                'from': 'users',
                'localField': 'workshop.organizer',
                'foreignField': '_id',
                'as': 'organizer'
              }
            }, {
              '$unwind': {
                'path': '$organizer'
              }
            }, {
              '$addFields': {
                'displayUser': {
                  '$concat': [
                    '$user.firstName', ' ', '$user.lastName'
                  ]
                },
                'displayOrganizer': {
                  '$concat': [
                    '$organizer.firstName', ' ', '$organizer.lastName'
                  ]
                },
                'workshop': '$_id.workshop',
                'workshopTitle': '$workshop.title',
                'organizerPicture': '$organizer.picture',
                'userPicture':'$user.picture'
              }
            }, {
              '$project': {
                'organizer': 0,
                'user': 0,
                '_id': 0
              }
            }, {
                  '$sort': {
                    'workshopTitle': 1
                  }
                }
          ], (err, interactions) => {
            if (err)
            {
                console.log(err)
                statusResponse(res,500)
            }
            else
            {
                res.json(status(interactions,200))
            }})
    }

    static SendMessageInDirection(direction)
    {
        return (req,res)=>this.sendMessage(req,res,direction)
    }

    static sendMessage(req,res,direction)
    {
        let msg = new message({user: req.session.user._id, workshop:req.body.workshop, direction:direction, date:Date.now(), text:req.body.text})
        msg.save().then(rec => {
            msgResponse(res,200,'Poruka uspesno poslata')
        }).catch(err => {
            msgFromMongoDb(err,res)
        })
    }
}
