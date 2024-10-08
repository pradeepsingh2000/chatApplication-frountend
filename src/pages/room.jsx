import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteList, getRoom } from "../redux/api/auth";
import { useSelector } from "react-redux";
import { loginUser } from "../redux/reducer/authslice";
import Chat from "../components/chat";
import RoomList from "../components/RoomList";
import { getSocket } from "../socket";

export default function Room() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = useSelector(loginUser);
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);

  const socket = getSocket();

  useEffect(() => {
    if (socket) {
      socket.on('remove_user',() =>{
        deleteChatList()
      });
    }
  }, [socket, id]);


  const getRoomById = async () => {
    try {
      const data = await getRoom(user.token,id);
      setRoom(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteChatList = async () => {
    try{
      const data = await deleteList(user.token,{roomId:id,userId:user.id})
    
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRoomById();
   
  }, []);

  useEffect(() => {
  
    deleteChatList();
  }, [id]);


 const handleRedirect = (() =>{
    deleteChatList()
    navigate('/home')
  })

  return (
    <div>
        {
          loading ? (
            <>
              <h1>Loading..</h1>
            </>
          ) : (
            <>
            <div className="row">
            <h1 className="col-8">Welcome to {room.name}</h1>
            <button className="btn btn-secondary" onClick={(e) => handleRedirect()}>Back</button>
            </div>
              
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <h1>Live Users</h1>
                    <RoomList roomId={id} user={user} />
                  </div>
                  <div className="col-8">
                    <Chat roomId={id} user={user} />
                  </div>
                </div>
              </div>
            </>
          )
          
        }
     
    </div>
  );
}
