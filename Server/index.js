const http = require("http");
const express = require("express");
const path = require('path');
const {Server} = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server,{

          cors:{
               origin:"http://localhost:3000",
               methods:["GET", "POST"],
               credentials:true,
          }
     })



     // Socket.io

     io.on('connection',(socket)=>{
          // console.log("A new user has connected",socket.id);

          socket.emit("welcome", `welcome to the server,${socket.id}`)
          // socket.broadcast.emit("welcome", `welcome to the server,${socket.id}`)

          socket.on("message", (data) =>{

               // console.log("pavan Bhai",data);
               // const fdata = { ...data, id:socket.id};
               // socket.broadcast.emit("receive-message",fdata)
               io.to(data.room).emit("receive-message",data.message)
               
          });
         
          
          // socket.on("user-message",(message)=>{
          //      console.log("A new user message", message);
          //      let payload = {message,name:"gagan"}
          //      io.emit("user-message", payload);
                    
          // });
     });





     app.use(express.static(path.resolve('./public')));


     app.get('/',(req,res)=>{
          return res.sendFile("/public/index.html");
     })






server.listen(9000,()=>console.log("server is running on = 9000")
)
