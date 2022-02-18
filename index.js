
const express=require('express')
const app = express()
app.use(express.json())

app.use('/users', require('./routes/userRoutes'))

app.listen(4005, ()=>{
    console.log("running")
})