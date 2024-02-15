import { sendDelEmail, sendSpotEmail } from '../controllers/mailer'
import user from '../models/user'
import message from '../models/message'
import subscription from '../models/subscription'
import workshop from '../models/workshop'
import { msgResponse, statusResponse } from './response.helper'
import interaction from '../models/interaction'

export function errcheck(res,cb)
{
    return (err,result) =>
    {
        if(err)
        {
            msgFromMongoDb(err,res)
        }
        else
        {
            cb(result)
        }
    }
}

export function msgFromMongoDb(err,res)
{
    let full = ''
    var spl = err.message.split(/[:,]/)
    spl = spl.map(x=>x.trim())
    for(var v of spl)
    {
        if(v.startsWith('|'))
        {
            full += v.substring(1)+'\n'
        }
    }
    if(full)
    {
        msgResponse(res,400,full)
    }
    else
    {
        console.log(err)
        statusResponse(res,500)
    }
}

export function checkSubscriptions()
{
    workshop.find((err,workshops)=>{
        if(err){console.log(err)}else
        {
            for(let workshop of workshops)
            {
                subscription.count({workshop:workshop._id, type:{$in:['reservation','participation']}},(num)=>
                {
                    if(num<workshop.totalSpaces)
                    {
                        subscription.find({workshop:workshop._id, type:'notification'},(err,notifications)=>
                        {
                            if(err){console.log(err)}else
                            {
                                for(let notification of notifications)
                                {
                                    user.findById(notification.user,(err,user)=>
                                    {
                                        if(err){console.log(err)}else
                                        {
                                            sendSpotEmail(user.email,workshop)
                                        }
                                    })
                                }
                                subscription.deleteMany({workshop:workshop._id, type:'notification'},(cnt)=>{})
                            }
                        })
                    }
                })
            }
        }
    })
}

export function DeleteOrphanedInteractions()
{
    interaction.find((err,interactions)=>
    {
        if(err){console.log(err)}else
        {
            for(let i of interactions)
            {
                workshop.count({title:i.workshop},(num:any)=>
                {
                    if(num==0)
                    {
                        interaction.deleteMany({workshop:i.workshop},(cnt)=>{})
                    }
                })
            }
        }
    })
}

export function NotifySubscriptions(id)
{
    workshop.findById(id,(err,res)=>
    {
        if(err){console.log(err)}else
        {
            subscription.find({workshop:id, type:{$in:['reservation','participation']}},(err,subscriptions)=>
            {
                if(err){console.log(err)}else
                {
                    for(let subscription of subscriptions)
                    {
                        user.findById(subscription.user,(err,user)=>
                        {
                            if(err){console.log(err)}else
                            {
                                sendDelEmail(user.email,res)
                            }
                        })
                    }
                    subscription.deleteMany({workshop: id},(cnt)=>{})
                }
            })
            workshop.deleteOne({_id:id},(cnt)=>{DeleteOrphanedInteractions()})
        }
    })
}

export function deleteWork(id)
{
    NotifySubscriptions(id)
    message.deleteMany({workshop: id},(cnt)=>{})
}

export async function convertToOrganizer(id)
{
    await user.updateOne({_id:id},{role:"organizer"})
    await subscription.deleteMany({user:id,type:"notification"})
}
