// using one file in another is termed as modularity..
const mongoose=require('mongoose')
const ExpenseTrackerSchema= new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:Date
    }
})
const Expense=mongoose.model('ExpenseDetails',ExpenseTrackerSchema)
// 1st argumnet-->collection name...2nd argument-->schema name
module.exports={Expense}