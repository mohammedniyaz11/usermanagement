const express=require('express')
const dotenv=require('dotenv').config()
const {errorHandler}=require('./middleware.js/errorMiddleware')
const port=process.env.PORT||5000
const app=express()
const connectDB=require('./config/db')

const goalRoutes=require('./routes/goalRoutes')
const userRoutes=require('./routes/userRoutes')
const adminRoutes=require('./routes/adminRouts')
app.use(express.json())
connectDB()

app.use('/api/goals',goalRoutes)
app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)


app.use(errorHandler)


app.use(express.urlencoded({extended:false}))


app.listen(port,()=>{
    console.log(`console log server listining on ${port}`)
})