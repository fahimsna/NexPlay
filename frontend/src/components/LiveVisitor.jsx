import { useEffect, useState } from "react";
import { io } from "socket.io-client";


// SOCKET CONNECTION

const socket = io(
  "http://localhost:8000",
  {
    transports: ["websocket"],
    reconnection: true,
  }
);



function LiveVisitor(){


  const [count,setCount] = useState(0);



  useEffect(()=>{


    // CONNECT

    socket.on("connect",()=>{


      console.log(
        "Socket Connected:",
        socket.id
      );


      // ask current count

      socket.emit(
        "getVisitorCount"
      );


    });




    // RECEIVE COUNT


    socket.on(
      "visitorCount",
      (data)=>{


        console.log(
          "LIVE COUNT:",
          data
        );


        setCount(data);


      }
    );




    return ()=>{


      socket.off("connect");


      socket.off(
        "visitorCount"
      );


    };


  },[]);




  return (

    <div
      className="
      bg-[#24272D]
      border
      border-white/10
      rounded-3xl
      p-8
      mt-5
      "
    >

      <p className="text-gray-400 text-sm">
        LIVE VISITORS
      </p>


      <h2 className="text-3xl font-bold text-white mt-2">

        🟢 {count}

      </h2>


    </div>

  );

}



export default LiveVisitor;