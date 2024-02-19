import { useRecoilValue, useSetRecoilState } from "recoil";
import { balance, token } from "../store/atoms/user";

export const getBalance=async (tokenValue,setBalance)=>{
    console.log("balance is ",setBalance)
    const response=await fetch("http://localhost:3000/api/v1/account/balance",{
        method:"GET",
        headers:{
            authorization:tokenValue
        }
    })
    const data=await response.json();
    setBalance(data.balance)
}