import { Request, Response } from "express"

export function statusResponse(res: Response,status: number)
{
    res.json({status: status})
}

export function status(body, status)
{
    body.status = status
}

export function redirect(body, destination)
{
    status(body, 302)
    body.destination = destination
}