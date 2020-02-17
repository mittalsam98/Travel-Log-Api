const {Router}=require('express');
const LogEntry=require('../models/Log');
require('dotenv').config();
const {API_KEY}=process.env
const router=Router();

router.get('/',async(req,res,next)=>{
try{
    const logdata=await LogEntry.find();
    res.json(logdata)
} catch(error){
    next(error)
}
})

router.post('/', async(req,res,next)=>{
    console.log(API_KEY);
    try {
             if(req.get('X-API-KEY') !== API_KEY){
                    res.status(401);
                    throw new Error('Unauthorized');
                }
            console.log(req.body)
            const logEntry=new LogEntry(req.body);
            const createdLog=await logEntry.save();
            res.json(createdLog);
        } catch(error){
            if(error.name==='ValidationError'){
                res.status(422);
            }
        next(error);
        }
        })

module.exports= router