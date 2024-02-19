import { atom, atomFamily } from "recoil";

export const currentID=atom({
    key:"currentID",
    default:""
})
export const firstName=atom({
    key:"firstName",
    default:""
})

export const lastName=atom({
    key:"lastName",
    default:""
})

export const email=atom({
    key:"email",
    default:""
})
export const passwordOne=atom({
    key:"passwordOne",
    default:""
})
export const passwordTwo=atom({
    key:"passwordTwo",
    default:""
})

export const token=atom({
    key:"token",
    default:""
})

export const balance=atom({
    key:"balance",
    default:0
})

export const users=atom({
    key:"users",
    default:[]
})

export const userState=(userID)=>{
    return users(userID)
}

export const sortUsers=atom({
    key:"sortUsers",
    default:[]
})


export const userClicked=atom({
    key:"userClicked",
    default:false
})

export const transitionLine=atom({
    key:"transition",
    default:false
})