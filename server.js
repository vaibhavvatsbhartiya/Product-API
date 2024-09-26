const express = require('express');
const dotenv = require("dotenv");
const product_routes = require("./routes/ProductRoutes"); 
const connectDB = require("./config/db")

// config env file
dotenv.config();
const uri = `${process.env.MONGO_URI}`;


const app = express();



const PORT = process.env.PORT || 8080;

app.get("/", (req, res)=>{
    res.send(`Hello, This Server is running on port: ${PORT}`);
})

// setup routes
app.use("/api/products", product_routes);

// start server
const startServer = async () =>{
    try{
        await connectDB(uri);
        app.listen(PORT, ()=>{
            `${PORT} is connected and you are live now`;
            console.log(`Port ${PORT} is connected and you are live now Vaibhav 😃.`);
        })
    }catch(error){
        res.send(error);
    }
}


startServer();