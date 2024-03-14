// https://expense-tracker-5.onrender.com
// mongodb+srv://ilakkiyasaravanan11:1234@mern.hoifnsy.mongodb.net/

const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const {Expense}=require('./schema.js')
const app = express()
app.use(bodyParser.json())
app.use(cors())
console.log("hello")
// git clone <link>
// link-->https://github.com/ilakkiya-2023/Expense_Tracker.git
//1st command-->git add .
// git commit -m "understandable command"
// git push origin main
/**                                   _
 * Adding a new expense/income->post   |
 * Displaying exsisting expense ->get  | 
 * Editing entries->patch/put          |
 * Deleting entries->delete           _|
 */
/**
 * 
 */

async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://ilakkiyasaravanan11:1234@mern.hoifnsy.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Mern')
        console.log("DB Connection established...")
        const port=process.env.port || 8000      //process.env.port-->uses the port that is available in cloud..
        app.listen(port,function(){
        console.log(`Listening on port ${port}`)
        })
    }   
    catch(error){
        console.log(error)
        console.log("Cant establish connection..")    
        }
    }
connectToDb()
// mongoose.conect is an asynchronous function-->so returns a promise
app.post('/add-expense',async function(request,response){
    try{
    await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date
    })
    response.status(200).json({    
        "status":"success",
        "message":"new entry added.."
    })
}
catch(error){
    response.status(500).json({       //500 -->when iternal failure error
        "status":"failure",
        "message":"entry is not created..",
        "error":error
    })
}
    // whenever response is sent status code has to be sent ,should be in json format and should have status message ...
})
app.get('/get-expense',async function(request,response){
    try{
        const expenseData = await Expense.find()   //expense.find is a asynchronous function-->there will be a delay
        response.status(200).json(expenseData)
    }
    catch(error){
        response.status(500).json({       //500 -->when iternal failure error
            "status":"failure",
            "message":"data cant be fetched..",
            "error":error
    })
}
})

// localhost:8000/delete-expense/65e69dbebce7e172710bd516
// localhost:8000/delete-expense/<param>
// to access params-->request.params  like  request.body
app.delete('/delete-expense/:id', async function(request,response){
    try{
        const ExpenseData = await Expense.findById(request.params.id)
        if(ExpenseData){
            await Expense.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "success",
                "message" :" entry deleted.."
            })
        }
    }
        
    catch(error){
            console.log("Can't retrieve such record..")
            response.status(400).json({       //500 -->when iternal failure error
                "status":"failure",
                "message":"data not found..",
                "error":error
    })
    }
})
app.patch('/edit-expense/:id',async function(request,response){
    try{
        const edit=await Expense.findById(request.params.id)
        if(edit){
            await edit.updateOne({
                "amount": request.body.amount,
                "category":request.body.category,
                "date":request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" :" entry deleted.."
            })
        }
        else{
            response.status(400).json({       //500 -->when iternal failure error
                "status":"failure",
                "message":"data not found..",
                "error":error
        })
    }
}
    catch(error){
        response.status().json({
            "status":"failure",
            "message":"data not found..",
            "error":error
        })
    }
})

// use of cors-->anyone can request and get data ...if not used-->we'll get cros platfom error
// body-parser-->is a middleware
// 