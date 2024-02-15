import mongoose from "mongoose"
import { checkSubscriptions, deleteWork, msgFromMongoDb } from "../helpers/db.helper"
import { msgResponse, status , statusResponse} from "../helpers/response.helper"
import message from "../models/message"
import subscription from "../models/subscription"
import workshop from "../models/workshop"

export class organizerController
{

    static getMessage(req,res)
    {
        message.aggregate([
            {
              '$match': {
                'workshop': new mongoose.Types.ObjectId(req.body.workshop),
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
                'user': '$_id.user',
                'workshopTitle': '$workshop.title',
                'organizerPicture': '$organizer.picture',
                'userPicture':'$user.picture'
              }
            }, {
              '$project': {
                'organizer': 0,
                '_id': 0
              }
            }, {
                  '$sort': {
                    'displayUser': 1
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

    static postMessage(req,res)
    {
        let msg = new message({user: req.body.user, workshop:req.body.workshop, direction:'W2U', date:Date.now(), text:req.body.text})
        msg.save().then(rec => {
            msgResponse(res,200,'Poruka uspesno poslata')
        }).catch(err => {
            msgFromMongoDb(err,res)
        })
    }

    static getWorkshop(req,res)
    {
      workshop.find({status:'active',organizer:req.session.user._id},(err, workshops) => {
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

    static getAll(req,res)
    {
      workshop.find({status:'active'},(err, workshops) => {
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
                totalSpaces:req.body.totalSpaces
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
                totalSpaces:req.body.totalSpaces
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

    static getSubscription(req,res)
    {
        subscription.find({type:'reservation',workshop:req.body.workshop}).populate('user').exec((err, workshops) => {
        if (err)
        {
            console.log(err)
            statusResponse(res,500)
        }
        else
        {
            res.json(status(workshops,200))
        }})
    }

    static patchSubscription(req,res)
    {
        if(req.body.type=='participation')
        {
            subscription.updateOne({_id: req.body.id}, {type: 'participation'}, {runValidators: true},(err,result)=>{
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
        else
        {
            subscription.deleteOne({_id: req.body.id},(cnt)=>{checkSubscriptions();msgResponse(res,200,'Uspesna promena stanja')})
        }
    }
}
