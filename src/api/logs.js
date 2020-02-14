const {Router}=require('express');
const LogEntry=require('../models/Log')
const router=Router();

router.get('/',(req,res)=>{
res.json({
    msg:"Hello"
})
})

router.post('/', async(req,res,next)=>{
try {
    const logEntry=new LogEntry(req.body);
    const createdLog=await logEntry.save();
    res.json(createdLog);
} catch(error){
next(error)
}
})

module.exports= router