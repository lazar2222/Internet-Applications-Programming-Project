import mongoose from "mongoose"
import interaction from "../models/interaction"
import { checkSubscriptions, msgFromMongoDb } from "../helpers/db.helper"
import { msgResponse, redirectResponse, status, statusResponse } from "../helpers/response.helper"
import subscription from "../models/subscription"
import workshop from "../models/workshop"

export class workshopController
{
    static getPast(req,res)
    {
        subscription.aggregate([
            {
              '$match': {
                'user': new mongoose.Types.ObjectId(req.session.user._id),
                'type': 'participation'
              }
            }, {
              '$lookup': {
                'from': 'workshops',
                'localField': 'workshop',
                'foreignField': '_id',
                'as': 'workshop'
              }
            }, {
              '$unwind': {
                'path': '$workshop'
              }
            }, {
              '$match': {
                'workshop.date': {
                  '$lt': new Date(Date.now())
                }
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
          ], (err, workshops) => {
            if (err)
            {
                console.log(err)
                statusResponse(res,500)
            }
            else
            {
                res.json(status(workshops,200))
            }
        })
    }

    static getSubscription(req,res)
    {
        subscription.aggregate([
            {
              '$match': {
                'user': new mongoose.Types.ObjectId(req.session.user._id)
              }
            }, {
              '$lookup': {
                'from': 'workshops',
                'localField': 'workshop',
                'foreignField': '_id',
                'as': 'workshop'
              }
            }, {
              '$unwind': {
                'path': '$workshop'
              }
            }, {
              '$match': {
                'workshop.date': {
                  '$gt': new Date(Date.now())
                }
              }
            }, {
              '$addFields': {
                'title': '$workshop.title',
                'titlePicture': '$workshop.titlePicture',
                'date': '$workshop.date',
                'location': '$workshop.location',
                'shortDesc': '$workshop.shortDesc',
                'wid': '$workshop._id'
              }
            }, {
              '$project': {
                'workshop': 0,
                'user': 0
              }
            }
          ], (err, workshops) => {
            if (err)
            {
                console.log(err)
                statusResponse(res,500)
            }
            else
            {
                res.json(status(workshops,200))
            }
        })
    }

    static postSubscription(req,res)
    {
        let newint = new subscription()
        newint.user=req.session.user._id;
        newint.workshop=req.body.workshop;
        newint.type=req.body.type;
        newint.save().then(rec => {
            msgResponse(res,200,'Prijava uspesno dodata')
        }).catch(err => {
            msgFromMongoDb(err,res)
        })
    }

    static deleteSubscription(req,res)
    {
        workshop.findById(req.body.workshop,(err,result)=>{
            if(err)
            {
                msgFromMongoDb(err,res)
            }
            else
            {
                if(result)
                {
                    let cuttof = Date.now()
                    let date = new Date(cuttof + 12*60*60*1000)
                    if(result.date>date)
                    {
                        subscription.deleteOne({user: req.session.user._id, workshop:req.body.workshop},(cnt)=>{
                            checkSubscriptions()
                            msgResponse(res,200,'Prijava uspesno obrisana')
                        })
                    }
                    else
                    {
                        subscription.deleteOne({user: req.session.user._id, workshop:req.body.workshop, type:{$in:['reservation','notification']}},(cnt)=>{
                            if(cnt>0)
                            {
                                checkSubscriptions()
                                msgResponse(res,200,'Prijava uspesno obrisana')
                            }
                            else
                            {
                                msgResponse(res,400,'Ne mozete povuci prijavu manje od 12 sati pre pocetka radionice')
                            }
                        })
                    }
                }
                else
                {
                    msgResponse(res,400,'Ne postoji radionica sa tim identifikatorom')
                }
            }

        })
    }

    static getDetails(req,res)
    {
        workshop.findById(req.body.workshop,(err,workshops)=>{
            if (err)
            {
                console.log(err)
                statusResponse(res,500)
            }
            else
            {
                res.json(status(workshops,200))
            }
        })
    }

    static getInteractions(req,res)
    {
      interaction.find({workshop:req.body.workshop}).populate('user').exec((err,workshops)=>{
          if (err)
          {
              console.log(err)
              statusResponse(res,500)
          }
          else
          {
              res.json(status(workshops,200))
          }
      })
    }

    static postSuggest(status)
    {
        return (req,res)=>{this.addWorkshop(req,res,status)}
    }

    static addWorkshop(req,res,status)
    {
      req.body = JSON.parse(req.body.json)
      let newint = new workshop()
      newint.title=req.body.title
      if(req.file)
      {
        newint.titlePicture=req.file.filename
      }
      else
      {
        newint.titlePicture=req.body.titlePicture
      }
      newint.date=req.body.date
      newint.location=req.body.location
      newint.shortDesc=req.body.shortDesc
      newint.longDesc=req.body.longDesc
      newint.gallery=req.body.gallery
      newint.totalSpaces=req.body.totalSpaces
      newint.organizer=req.session.user._id
      newint.status=status
      newint.save().then(rec => {
          redirectResponse(res,'/suggest/success')
      }).catch(err => {
          msgFromMongoDb(err,res)
      })
    }

    static SpacesTaken(req,res)
    {
        subscription.countDocuments({workshop:req.body.workshop, type:{$in:['reservation','participation']}},(err,cnt)=>{
            if (err)
            {
                console.log(err)
                statusResponse(res,500)
            }
            else
            {
                res.json(status({count:cnt},200))
            }
        })
    }

    static upload(req,res)
    {
        if(req.file)
        {
            res.json(status({path:req.file.filename},200))
        }
        else
        {
            msgResponse(res,400,'Slika nije u validnom formatu')
        }
    }
}
