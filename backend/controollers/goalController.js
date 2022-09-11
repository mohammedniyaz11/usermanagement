
const expressAsyncHandler = require('express-async-handler')
const asynHandler=require('express-async-handler')

const Goal=require('../models/goalModel')
const User=require('../models/userModel')



module.exports.getGoals=asynHandler(async(req,res)=>{
    console.log(req.user.id)
const goals=await Goal.find({user:req.user.id})


console.log(req.user.id)

    res.json(goals)
})


module.exports.setGoals=expressAsyncHandler(async(req,res)=>{
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
      }
      console.log("id=========",req.user.id)
    
      const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
      })
    
      res.status(200).json(goal)
})



module.exports.updateGoal= asynHandler(async(req,res)=>{
    console.log("upadte goal",req.user.id)

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
      res.status(400)
      throw new Error('Goal not found')
    }



    const{id}=req.params;



    const user=await User.findById(req.user.id)


if(!user){
res.status(401)
throw new Error('user not found')
}

if(goal.user.toString() !== user.id){
    res.status(401)
    throw new Error('user not authorized')
}


    const updategoal=await Goal.findByIdAndUpdate(id,req.body,{new:true})
    res.json(updategoal)
})

module.exports.deleteGoal= asynHandler(async(req,res)=>{
    const{id}=req.params;




    
    const goal=await Goal.findByIdAndDelete(id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
      }
    
      // Check for user
      if (!req.user) {
        res.status(401)
        throw new Error('User not found')
      }
    
      // Make sure the logged in user matches the goal user
      if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }
    
      await goal.remove()
    
      res.status(200).json({ id: req.params.id })
    })
  




