//Load env variables
if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import toDoRoutes from './routes/toDoRoutes';
import connectToDb from './config/connectToDb';


// Create an express app
const app = express();

//Connect to DB
connectToDb();

//Middleware
app.use(bodyParser.json());

//Routes
app.use('/api',userRoutes);
app.use('/api',toDoRoutes);


//Start the server
app.listen(3005,()=>{
  console.log("Server is running")
})