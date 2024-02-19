import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { balance, currentID, token } from "../store/atoms/user"
import { useState } from "react"
import { Send } from "./Send"


export const UserDetails=({key,user})=>{

    const id=useRecoilValue(currentID)
    const [open,setOpen]=useState(false)
    console.log("users id ",user._id)
    console.log("current ",id)
    if (user._id==id) {
        console.log(user._id,id)
        return
    }
    const handleClose=()=>{
        setOpen(false)
    }
    const handleOpen=()=>{
        setOpen(true)
    }
     
    
        return (
            <div >
                
                <div >
                <div className="flex flex-row p-2 transition ease-in-out delay-10 hover:scale-105 hover:bg-gray-300 rounded-lg m-5">
                    <div className="w-10 uppercase rounded-full bg-gray-200 mr-3 text-2xl text-center">{user.firstName[0]}{ user.lastName[0]}</div>
                    <p className="flex-1 font-semibold text-lg">{user.firstName} {user.lastName}</p>
                    <button className="w-32 bg-black text-white rounded-lg h-10 transition ease-in-out delay-100 hover:scale-110 duration-200 hover:bg-slate-900" onClick={ handleOpen}>Send Money</button>
                </div>
                <hr/>
                </div>
                <div>
                    <Send isOpen={open} onClose={handleClose} user={user}/>
                </div>

            </div>
        );
    
}