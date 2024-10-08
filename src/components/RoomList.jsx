import React, { useEffect, useState } from 'react'
import { getSocket } from '../socket';
import { getChatList } from '../redux/api/auth';

export default function RoomList({ roomId, user }) {
  const socket = getSocket();
  const [list,setList] = useState([])
  useEffect(() => {
    if (socket) {
      socket.on('fetchList',() =>{
        ChatList()
      });
    }
  }, [socket, roomId]);

  const ChatList = async () => {
    try{
      const data = await getChatList(user.token,roomId)
      console.log(data,'the data')
      setList(data.data)

    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() =>{
    ChatList()
  },[])

  return (
    <div>
    {
      list.length > 0 && (
        <ul>
          {list.map((e) => (
            <li key={e._id}>
              {e.result.name}
            </li>
          ))}
        </ul>
      )
    }
  </div>
  
  )
}
