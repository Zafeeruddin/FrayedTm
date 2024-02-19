import { getBalance } from "./getBalance";

export const sendMoney=async (user,amount,tokenValue,setBalance,setMessage)=>{
    const toACId=user._id;
    console.log("inside send money",user._id)
    const response=await fetch("http://localhost:3000/api/v1/account/transfer",{
        method:"PUT",
        headers:{
            authorization:tokenValue,
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            "toAcId":toACId,
            "balance":amount
        })
    })
    const data=await response.json();
    let message=JSON.stringify(data.message)
    message=message.replace(/^"|"$/g,'')
    console.log("message being",message)
    setMessage(message)
    getBalance(tokenValue,setBalance)

}