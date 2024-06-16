const setratelimit=require('express-rate-limit')

const setlimit=setratelimit({
    windowMs: 1 * 60 * 1000, //1 minutes
    limit: 5,
    message:'You have exceeded your 5 requests per minute limit.',
    legacyHeaders: true,
})
module.exports=setlimit