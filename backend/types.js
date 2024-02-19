const z=require("zod")

const userSignup=z.object({
    firstName:z.string(),
    lastName:z.string(),
    email:z.string().email(),
    password:z.coerce.string().min(8)
})

const userSignin=z.object({
    email:z.string(),
    password:z.coerce.string().min(8)
})

module.exports={
    userSignin,
    userSignup
}