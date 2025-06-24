const express= require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const cors=require('cors');
const middlewares=require('./middlewares');
const mongoose=require('mongoose');
require('dotenv').config();
const logs=require('./apis/logs') 

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
})
const app= express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin:process.env.FRONTEND_URL
}));

app.get('/',(req,res)=>{
    res.json({
        message:"Hello World!"
    })
});
app.use('/api/logs',logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port=process.env.PORT||3000

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
});