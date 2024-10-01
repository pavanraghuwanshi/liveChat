import {react,useEffect, useMemo, useState} from "react";
import {io} from 'socket.io-client'
import './App.css'; 
function App() {

        // const socket = io("http://localhost:9000");
        const socket = useMemo(() => io("http://localhost:9000"),[]);

        const [message, setMessage] = useState("");
        const [allmessage, setAllmessage] = useState([]);
        const [room, setRoom] = useState("");
        const [socketID, setSocketID] = useState("");

        const handleSubmit = (e)=>{

          e.preventDefault();
          socket.emit("message",{ message, room});
          setMessage("")
         
      };
      


        useEffect(() => {
          socket.on("connect",()=>{
                  console.log("connected",socket.id);
                  setSocketID(socket.id)
                  
                  // socket.on("welcome",(s)=>{
                  //   console.log(s);
                    
                  // })
         });

         socket.on("receive-message",(data)=>{
          console.log(data);
          setAllmessage((messages) => [...messages, data])
     })
        }, [])

  //   socket.on("receive-message", (data) => {
  //     if (data.id !== socketID) {
  //       console.log("Message from another user:", data);
  //     } else {
  //       console.log("Ignored own message:", data);
  //     }
  //   });
  // }, []);

      

  return (
    <div className="style">
    <container maxWidth="sm">

      <h1 variant="h1" component="div" gutterBottom>

            Welcome to Socket.io
      <h6>{socketID}</h6>
      </h1> 

      <form  onSubmit={handleSubmit}>
    <input value={message} onChange={e=> setMessage(e.target.value)} id="outliend-basic" lable="Message" varient="outliend"/>
      <button variant="contained" color="primary">
        send
      </button>

      </form>
    </container>



    <container maxWidth="sm">

      <h1 variant="h1" component="div" gutterBottom>

            Welcome to Socket.io

      </h1> 

      <form  onSubmit={handleSubmit}>
    <input value={room} onChange={e=> setRoom(e.target.value)} id="outliend-basic" lable="Room" varient="outliend"/>
      <button variant="contained" color="primary">
        send
      </button>

      </form>

        {/* <p>{allmessage}</p> */}

         <div>
            <h4>All Messages</h4>
              {allmessage.map((message,index)=>{
                
             return <p key={index}>{message}</p>
              })}
      </div>

    </container>



    </div>
  );
}

export default App;
