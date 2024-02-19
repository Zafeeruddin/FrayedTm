import { useRecoilCallback, useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { balance,  firstName,  sortUsers,  token, transitionLine, userClicked } from "../store/atoms/user"
import { Suspense, useEffect, useState } from "react"
import { UserDetails } from "./GetUsers"
import { getBalance } from "../functions/getBalance"
import { useNavigate } from "react-router-dom"
import { UsersSkeleton } from "../UI/skeleton"

export const Dashboard=()=>{
    const [isClicked,setClicked]=useRecoilState(userClicked)
    const navigate=useNavigate(null)
    const [tokenValue,setToken]=useRecoilState(token)
    if(tokenValue==""){
        console.log("restricted");
        setInterval(navigate("/login"),3000)
    }
    const [sorted,setSortUsers]=useRecoilState(sortUsers)
    const [balanceValue,setBalance]=useRecoilState(balance)
    const userName=useRecoilValue(firstName)
    const [user,setUser]=useState([])
    const [query,setQuery]=useState("")
    console.log("user is "+ userName)
    useEffect(()=>{
        console.log(tokenValue)
        getBalance(tokenValue,setBalance)
        getUsers()
    },[])
    
    
    const getUsers = async () => {
        const response = await fetch("http://localhost:3000/api/v1/user/bulk", {
            method: "GET",
            headers: {
                authorization: tokenValue
            }
        });
        const data = await response.json();
        console.log(JSON.stringify(data.user))
        setUser(data.user)
        console.log("daat after",data.user)
        
    }

    const updateUsers = () => {
        return user.map((bankUser) => {
            if (bankUser.firstName.startsWith(query)) {
                return <UserDetails key={bankUser._id} user={bankUser} />;
            }
            return null; 
        });
    };
    const logOut=()=>{
        setToken("")
        setClicked(false)
        navigate("/login")
        return
    }
    const profileClick=()=>{
        setClicked(true);
    }
    return (
        <div>
            <div className="flex m-3">
                <div className="font-bold text-4xl">FrayedTm</div>
                <div className=" flex absolute right-0 p-4 text-lg font-mono">
                    <div className="">Hello,  {userName}</div>
                    <button  className="mr-3 ml-3 capitalize font-mono text-2xl rounded-full bg-gray-300 w-8 bg-center text-center h-8">{userName[0]}</button>
                    <button onClick={logOut} className=" text-white  rounded-lg transition ease-in-out bg-slate-800 hover:bg-red-600  hover:scale-110  duration-300 w-20 text-center">logout</button>
                </div>
            </div>
            
           
            <hr className="opacity-80 mt-7"></hr>
            <div className="text-xl font-bold m-3 p-1">Your Balance ${balanceValue}</div>
            <div className="text-xl font-bold m-3 p-1">Users</div>
            <input className="text-xl font-bold m-3 p-3 w-full rounded-lg focus:p-5 border-solid focus:m-2 font-mono border-slate-800 border-2" onChange={(e)=>{
                setQuery(e.target.value);
            }} type="text" placeholder="Search users..."  />
            <Suspense fallback={<UsersSkeleton/>}>
            <div>
                    {updateUsers()}
            </div>
            </Suspense>
        </div>
    )
} 