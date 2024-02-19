import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { balance, firstName, token, transitionLine } from "../store/atoms/user"
import { moneySent, recieversName } from "../store/atoms/depositer"
import { sendMoney } from "../functions/sendMoney"
import { useState } from "react"

export const Send=({isOpen,onClose,user})=>{
    if(!isOpen) return null;
    const [message,setMessage]=useState("")
    const tokenValue=useRecoilValue(token)
    if(tokenValue==""){return "Restricted route... \n redirecting to login page"}
    const setBalance=useSetRecoilState(balance)
    const [amount,setAmount]=useRecoilState(moneySent)
    const [showLine, setShowLine] = useRecoilState(transitionLine);

    
    const sendAmount=()=>{

        console.log("user is ",user)
        console.log("amount is ",amount)
        sendMoney(user,amount,tokenValue,setBalance,setMessage)
        setShowLine(true)
        let messageRecieved=message
        messageRecieved= messageRecieved.replace(/^"|"$/g,'')
        console.log("message after ",message)
        if (messageRecieved=="transaction successfull") {
            console.log("7 kadod")
            setMessage("")
            setAmount(0)
            setShowLine(false)
            
        }

    }
    console.log("inside send ")
    return (
<div className="backdrop-filter rounded-xl backdrop-blur-3xl bg-opacity-100 shadow-xl w-96 h-96 p-4 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">    
    <button className="rounded-full bg-red-200 font-mono text-xl font-bold w-8 h-8 relative left-80 mb-3 top-0 hover:bg-red-400 hover:text-2xl" onClick={()=>onClose()}>x</button>
    <div className="text-center font-extrabold text-4xl mb-14">Send Money </div>
    <div className="flex flex-row ml-4">
        <div className="rounded-full  w-12 text-3xl text-center h-12 text-slate-100 bg-green-500">{user.firstName[0]}</div>
        <div className="flex-1 font-bold ml-3 text-3xl">{user.firstName}</div>
    </div>
    <div>
        <p className="font-semibold p-3 ">Amount (in $)</p>
        <input className="border p-3 h-10 w-full rounded-lg mb-3 focus:font-mono focus:p-4" onChange={(e)=>setAmount(e.target.value)} type="text" placeholder="Enter amount"></input>
        <button className="border p-2 w-full h-10 rounded-xl font-mono bg-green-500 text-white hover:bg-green-600 " onClick={()=>sendAmount()}  >Initiate Transfer</button>
        <div>{message}</div>
    </div>
</div>

    )
}