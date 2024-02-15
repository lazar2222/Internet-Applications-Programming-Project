import { Router } from "@angular/router";
import { IdentityService } from "../services/identity.service";

export function bodyChecker(body,msg,router:Router)
{
    msg.msg=""
    msg.errmsg=""
    if(body.status==500)
    {
        msg.errmsg = 'Doslo je serverske greske'
        return false
    }
    if(body.status==400)
    {
        msg.errmsg = 'Doslo je do klijentske greske'
        if(body.msg)
        {
            msg.errmsg = body.msg;
        }
        return false
    }
    if(body.status==302)
    {
        router.navigate([body.destination])
        return true
    }
    if(body.status==200)
    {
        if(body.msg)
        {
            msg.msg = body.msg;
        }
        return true
    }
    if(body.status==401)
    {
        router.navigate(['401'])
        return false
    }
    return false
}

export function bodyChecker2(body,msg,router:Router,is:IdentityService)
{
    msg.msg=""
    msg.errmsg=""
    if(body.status==500)
    {
        msg.errmsg = 'Doslo je serverske greske'
        return false
    }
    if(body.status==400)
    {
        msg.errmsg = 'Doslo je do klijentske greske'
        if(body.msg)
        {
            msg.errmsg = body.msg;
        }
        return false
    }
    if(body.status==302)
    {
        router.navigate([body.destination])
        return true
    }
    if(body.status==200)
    {
        if(body.msg)
        {
            msg.msg = body.msg;
        }
        return true
    }
    if(body.status==401)
    {
        return false
    }
    return false
}

export function dateToString(date)
{
    let d= new Date(date)
    return String(d.getDate()).padStart(2, '0')+'.'+String(d.getMonth()+1).padStart(2, '0')+'.'+String(d.getFullYear()).padStart(4, '0')+". "+String(d.getHours()).padStart(2, '0')+":"+String(d.getMinutes()).padStart(2, '0')
}