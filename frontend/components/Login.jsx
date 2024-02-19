import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { currentID, email, firstName, passwordOne, token } from "../store/atoms/user"
import { useNavigate } from "react-router-dom"
import { Suspense, useRef } from "react"
import { Button, Change, Heading, InputBox, InputLabel, SubHeading, UserPage } from "../UI/heading"
import { UserDetails } from "./GetUsers"
import { UsersSkeleton } from "../UI/skeleton"

export const Login=()=>{
    const ref=useRef(null)
    const navigate=useNavigate("/dashboard")
    const [mail,setEmail]=useRecoilState(email)
    const [passOne,setPasswordOne]=useRecoilState(passwordOne)
    const setUserName=useSetRecoilState(firstName)
    const [id,setID]=useRecoilState(currentID)
    const body={
        "email":mail,
        "password":passOne
    }
    const setToken=useSetRecoilState(token)
    const signin=async ()=>{
        const response=await fetch("http://localhost:3000/api/v1/user/signin",
        {
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                "Content-type":"application/json"
            }
        })
        const data=await response.json()
        console.log(ref.current)
        ref.current.innerHTML=JSON.stringify(data.message)
        if(data.message=="User Signed"){
            setToken(data.token)
            setUserName(data.username)
            setID(data.id)
            console.log("username set is " + data.username)
            navigate("/dashboard")
        }
    }

    
    return (
        <UserPage>
        <div>
            <Suspense fallback={<UsersSkeleton/>}>
            <Heading>
                <div>Sign In</div>
            </Heading>
            <SubHeading>
                <div>Enter your credentials to access your account</div>
            </SubHeading>
            <InputLabel>
                <p>Email</p>
            </InputLabel>
            <InputBox>
                <input className="rounded p-1 focus:p-2  w-full border-solid border-slate-400 border-2 focus:font-mono"  type="text" placeholder="john@gmail.com" onChange={(e)=>setEmail(e.target.value)} />
            </InputBox>
            <InputLabel>
                <p>Password</p>
            </InputLabel>
            <InputBox>
                <input className="rounded p-1 focus:p-2  w-full border-solid border-slate-400 border-2 focus:font-mono"  type="password" placeholder="" onChange={(e)=>setPasswordOne(e.target.value)}/>
            </InputBox>
            <Button>
                <button onClick={signin}>Sign In</button>
            </Button>
            <Change>
                    <div>Don't have an account? <a className="transition ease-in-out delay-150 hover:scale-125 hover:text-slate-900" href="/signup">Sign Up</a></div>
            </Change>
            <div ref={ref}></div>
            </Suspense>
        </div>
        </UserPage>
    )
}