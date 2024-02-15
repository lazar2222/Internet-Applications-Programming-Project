import { Request, Response } from 'express'

export function statusResponse(res: Response,status: number)
{
    res.json({status: status})
}

export function redirectResponse(res: Response, destination)
{
    res.json({status: 302, destination:destination})
}

export function msgResponse(res: Response, status, msg)
{
    res.json({status: status, msg:msg})
}

export function status(body,status)
{
    return {data:body,status:status}
}