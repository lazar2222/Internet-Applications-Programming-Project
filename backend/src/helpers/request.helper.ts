import { Request, Response } from 'express'
import { msgResponse } from './response.helper'
import fs from 'fs'
import imageSize from 'image-size'

export function checkParams(body, params, res)
{
    for(var i in params)
    {
        if(body[params[i]] === undefined || body[params[i]] === undefined || body[params[i]]==='')
        {
            msgResponse(res,400,params[i]+' je obavezan')
            return false
        }
    }
    return true
}

export function cleanupProfile(req)
{
    if(req.file && fs.existsSync('files/profile/'+req.file.filename))
    {
        fs.unlinkSync('files/profile/'+req.file.filename)
    }
}

export function checkImage(req)
{
    var dimensions = imageSize('files/profile/'+req.file.filename)
    if(dimensions.height < 100 || dimensions.height > 300 || dimensions.width < 100 || dimensions.width > 300)
    {
        cleanupProfile(req)
    }
}

export function generateKey()
{
    let key = ''

    for(let i = 0; i<10; i++)
    {
        key+=String.fromCharCode(65 + Math.floor(Math.random() * 26))
    }

    return key
}