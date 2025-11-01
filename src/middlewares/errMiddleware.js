import { getErrorMesage } from "../utils/errorUtils.js"

export function errorMiddleware(err,req,res,next){
    const status =  err.statusCode || 500
    const message = getErrorMesage(err)

    res.status(status).render('404', {error:message})
}