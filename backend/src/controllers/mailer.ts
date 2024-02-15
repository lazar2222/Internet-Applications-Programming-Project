import { statusResponse } from '../helpers/response.helper'
import { msgResponse } from '../helpers/response.helper'

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

export function sendRecoveryEmail(email, key, res)
{
    let url = 'http://localhost:4200/recover?key='+key
    const msg = {
        to: email,
        from: 'lazar2premovic@gmail.com',
        subject: 'Resetujte lozinku',
        html: '<html><head></head><body>Posetite sledeci link kako biste resetovali lozinku: <a href="'+url+'">'+url+'</a></body></html>',
      }
      sgMail
        .send(msg)
        .then(() => {
            msgResponse(res,200,'Ukoliko je e-mail adresa ispravna, na nju je poslat mail sa instrukcijama')
        })
        .catch((error) => {
            console.log(error)
            statusResponse(res,500)
        })
}

export function sendSpotEmail(email,workshop)
{
    const msg = {
        to: email,
        from: 'lazar2premovic@gmail.com',
        subject: 'Oslobodjeno mesto za radionicu',
        html: 'Radionica '+workshop.title+' sada ima slobodnih mesta, mozete se prijaviti kroz aplikaciju.',
      }
      sgMail
        .send(msg)
        .then(() => {
            
        })
        .catch((error) => {
            console.log(error)
           
        })
}

export function dateToString(date)
{
    let d= new Date(date)
    return String(d.getDate()).padStart(2, '0')+'.'+String(d.getMonth()+1).padStart(2, '0')+'.'+String(d.getFullYear()).padStart(4, '0')+". "+String(d.getHours()).padStart(2, '0')+":"+String(d.getMinutes()).padStart(2, '0')
}
export function sendDelEmail(email,workshop)
{
    const msg = {
        to: email,
        from: 'lazar2premovic@gmail.com',
        subject: 'Radionica otkazana',
        html: 'Radionica '+workshop.title+' datuma '+dateToString(workshop.date)+' je otkazana.',
      }
      sgMail
        .send(msg)
        .then(() => {
            
        })
        .catch((error) => {
            console.log(error)
           
        })
}