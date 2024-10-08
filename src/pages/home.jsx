import React, { useEffect, useState } from "react";
import { loginUser, setUser } from "../redux/reducer/authslice";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import toastResponse  from "../utils/response"
import Loader from "../components/loader";
import { getAllRooms, registerUser, userProfile } from "../redux/api/auth";
import { setRef } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Home() {
  const user = useSelector(loginUser);
  const [loading, setLoading] = useState(false);
  const [Info, setUserInfo] = useState();
  const [rooms,setRooms] = useState([]);
  const [showRoom,setShowRoom] = useState(false)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  
  const [name,setName] = useState()

  useEffect(() => {
    if (user.isLogin) {
      console.log("User Login");
      getRooms()
    } else {
      setOpen(true)
      console.log("User not login");
    }
  },[]);

  const getRooms = async (token) => {
    try{
      setLoading(true)
      let tok = token ? token : user.token
      const data = await getAllRooms(tok)
      setRooms(data.data)
      setLoading(false)
      setShowRoom(true)
      
    }catch(error) {
      setLoading(false)
      toastResponse.error("Something went wrong!!")

    }
  }

  const handleSubmit = async () => {
    if(!name) return toastResponse.error("Please enter name")
      try{
        const data = await registerUser({name})
        if(data.success) {
          dispatch(setUser(data.data))
          toastResponse.success("Choose Room")
          handleClose()
          getRooms(data.data.token)
        }
    }
    catch(error) {
      toastResponse.error("Something went wrong!!")
    }
   
  }


  return (
    <div className="container mt-5">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          onClick: (event) => event.stopPropagation(),
        }}
      >
        <Box sx={style}>
        <div className="mb-3 row">
    <div className="col-sm-10">
    <label for="exampleFormControlInput1" class="form-label">Enter Name</label>

      <input type="text" readonly class="form-control-plaintext" onChange={(e) =>{
        setName(e.target.value)
      }} placeholder="name.."  />
      <Button variant="contained" onClick={(e) => handleSubmit()}>Submit</Button>
    </div>
  </div>

        </Box>
      </Modal>
      {
        loading ? (<>
        <h1>Loading..</h1>
        
        </>) : ( showRoom && rooms?.length &&
          <div className="row row-cols-1 row-cols-md-2 g-4">
          {
            rooms?.map((room) =>(
  <div className="col">
    <Link style={{
      color:"none"
    }} to={`/room/${room._id}`}>
    <div className="card">
      <img src="..." className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{room.name}</h5>
      </div>
    </div>
    </Link>
    </div>
            ))
          }
          </div>
        )
      }
   </div>
  );
}
