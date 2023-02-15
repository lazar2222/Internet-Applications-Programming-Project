import { Request, Response } from "express"
import { statusResponse } from "../helpers/response.helper"

export function filterGuest(req, res, next)
{
    if(req.session.user)
    {
        statusResponse(res,401)
    }
    else
    {
        next()
    }
}

export function filterUser(req, res, next)
{
    if(req.session.user)
    {
        next()
    }
    else
    {
        statusResponse(res,401)
    }
}

export function filterOrganizer(req, res, next)
{
    if(req.session.user && req.session.user.role=='organizer')
    {
        next()
    }
    else
    {
        statusResponse(res,401)
    }
}

export function filterAdmin(req, res, next)
{
    if(req.session.user && req.session.user.role=='admin')
    {
        next()
    }
    else
    {
        statusResponse(res,401)
    }
}