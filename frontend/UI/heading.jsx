export const Heading=({children})=>{
    return (
        <div className="font-bold text-4xl m-3 text-center ">{children}</div>
    )
}
export const SubHeading=({children})=>{
    return (
        <div className="m-3 w-70 text-center  text-slate-700 ">{children}</div>
    )
}

export const InputBox=({children})=>{
    return <div className="m-1 ml-1 mb-2 w-full rounded-lg ">{children}</div>
}
export const InputLabel=({children})=>{
    return <div className="font-bold m-1 ml-1">{children}</div>
}

export const Button=({children})=>{
    return (
        <div className="rounded-lg p-3 m-3 w-full text-center border-solid border-1 bg-slate-900 text-white  transition ease-in-out delay-3000 hover:tranlate-y-1 hover:scale-105 ml-1">
          {children}  
        </div>
    )
}

export const Change=({children})=>{
    return (
        <div className="font-semibold w-full m-3 text-center">{children}</div>
    )
}

export const UserPage=({children})=>{
    return (
        <div className="w-96 h-6/12 rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center  bg-slate-200 ">{children}</div>
    )
}

export const GreenMessage=({children})=>{
    return (
        <div className="bg-green-500 text-white px-3 h-5 text-xs py-1 rounded-md inline-flex items-center ">
  <span>
    {children}
  </span>
</div>

    )
}
export const RedMessage=({children})=>{
    return (
        <div className="bg-red-500 text-white px-3 h-5 text-xs py-1 rounded-md inline-flex items-center ">
  <span>
    {children}
  </span>
</div>

    )
}
