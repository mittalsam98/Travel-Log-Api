const {Router}=require('express');
const LogEntry=require('../models/Log')
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
try {
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