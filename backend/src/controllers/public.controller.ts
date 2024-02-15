import interaction from "../models/interaction"
import { status } from "../helpers/response.helper"
import { statusResponse } from "../helpers/response.helper"
import workshop from "../models/workshop"

export class publicController
{
    static getWorkshop(req,res)
    {
        workshop.find({ date: {$gte:Date.now()}, status: 'active' }, 'title titlePicture date location shortDesc', (err, workshops) => {
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

    static getTop(req,res)
    {
      workshop.find({status: 'active' }, 'title titlePicture date location shortDesc', (err, workshops) => {
        if (err)
        {
            console.log(err)
            statusResponse(res,500)
        }
        else
        {
            let wdict={}
            for(let ws of workshops)
            {
              wdict[ws.title]=0
            }
            interaction.find({comment:null},(err, interactions) => {
              if (err)
              {
                  console.log(err)
                  statusResponse(res,500)
              }
              else
              {
                for(let i of interactions)
                {
                  wdict[i.workshop]++
                }
                let list=[]
                for(let k in wdict)
                {
                  list.push({name:k, count:wdict[k]})
                }
                list.sort((x,y)=>{return y.count-x.count})
                list = list.slice(0, 5);
                res.json(status(list,200))
              }
            })
        } 
      })
    }
}
