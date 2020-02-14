const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
const middlewares =require('./middleware');
const logs =require('./api/logs');
const mongoose =require('mongoose');

require('dotenv').config();

const app =express();

mongoose.connect(process.env.URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>(console.log('Database is connected')));

app.use(cors());
app.use(morgan('common'));
app.use(helmet());
app.use(express.json())


app.get('/',(req,res,next)=>{
    res.json({
        msg:'In index.js'
    });
});


app.use('/api/logs',logs);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT =process.env.PORT||3000;

app.listen(PORT,()=>{console.log(`Server is running on PORT ${PORT}`)})

