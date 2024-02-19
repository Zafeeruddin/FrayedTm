const { bankACModel } = require("./db")

 const transferFunds=async (sender, reciever,amount)=>{
    
    sender.balance=sender.balance-amount
    console.log("recievers balance ",reciever.balance)
    console.log("amount to be send ", parseInt(amount))
    amount=parseInt(amount)
    reciever.balance=reciever.balance+amount

    sender.save()
    reciever.save()
}


module.exports=transferFunds