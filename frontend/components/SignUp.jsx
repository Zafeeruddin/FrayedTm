import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { email, firstName, lastName, passwordOne, passwordTwo } from "../store/atoms/user"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Change, GreenMessage, Heading, InputBox, InputLabel, RedMessage, SubHeading, UserPage } from "../UI/heading"
export const SignUp=()=>{
    const [first,setFirstName]=useRecoilState(firstName)
    const [last,setLastName]=useRecoilState(lastName)
    const [passOne,setPasswordOne]=useRecoilState(passwordOne)
    const [mail,setEmail]=useRecoilState(email)
    const [passTwo,setPasswordTwo]=useRecoilState(passwordTwo)
    const [message,setMessage]=useState(null)
    const userBody={
        "firstName":first,
        "lastName":last,
        "passwordOne":passOne,
        "passWordTwo":passTwo,
        "email":mail
    }
    const navigate=useNavigate()

    
    const setUser=async ()=>{
        const url="http://localhost:3000/api/v1/user/signup"
        const response=await fetch(url,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userBody)
        }
        )    
        const data=await response.json();
        console.log(data.message)
        const messageRecieved= JSON.stringify(data.message).replace(/^"(.*)"$/,'$1')
        setMessage(messageRecieved)
        console.log(message)
        
        //navigate("/login")
    }
    
    const messageSet=()=>{
        const messageRecieved=message
        const pwd="Passwords do not match"
        const success="User created successfully"
        if(messageRecieved==pwd || messageRecieved=="email" ){
            console.log(messageRecieved)
            setMessage(messageRecieved)
            return <RedMessage>{message}</RedMessage>
        }else{
            return <GreenMessage>{message}</GreenMessage>
        }
    }

    return(
        <UserPage>
            <div>
                <Heading>
                    <div>Sign up</div>
                </Heading>
                <SubHeading>
                    <div>Enter your information to create an account</div>
                </SubHeading>
                <InputLabel>
                    <p>First Name</p>
                </InputLabel>
                <InputBox>
                    <input className="rounded p-1 focus:p-2  w-full border-solid border-slate-400 border-2 " type="text" onChange={(e)=>setFirstName(e.target.value)} placeholder="John"/>
                </InputBox>
                <InputLabel>
                    <p>Last Name</p>
                </InputLabel>
                <InputBox>
                    <input className="rounded p-1 focus:p-2  w-full border-solid border-slate-400 border-2 focus:font-mono" type="text" onChange={(e)=>setLastName(e.target.value)} placeholder="Doe"/>
                </InputBox>
                <InputLabel>
                    <p>Email</p>
                </InputLabel>
                <InputBox>                    
                    <input className="rounded p-1 focus:p-2  w-full border-solid border-slate-400 border-2 focus:font-mono" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="john@gmail.com" />
                </InputBox>
                <InputLabel>
                    <p>Password</p>
                </InputLabel>                    
                <InputBox>
                    <input className="rounded p-1 focus:p-2  w-full border-solid border-slate-400 border-2 focus:font-mono" type="password" onChange={(e)=>setPasswordOne(e.target.value) }/>
                </InputBox>
                <InputLabel>
                    <p>Confirm Password</p>
                </InputLabel>
                <InputBox>
                    <input className="rounded p-1 focus:p-2  w-full border-solid border-slate-400 border-2 focus:font-mono" type="password" onChange={(e)=>setPasswordTwo(e.target.value)} /><br/>
                </InputBox>
                <Button>
                    <button onClick={setUser}>Sign Up</button>
                </Button>
                <Change>
                    <div>Already have an account? <a href="/login">Sign in</a></div>
                </Change>

                <div>
                    {messageSet}
                </div>
            </div>
        </UserPage>
    )
}