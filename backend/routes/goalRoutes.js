const express=require('express')
const router=express.Router()
const {getGoals,setGoals,deleteGoal,updateGoal}=require('../controollers/goalController')
const {protect} =require('../middleware.js/authMiddleware')


router.get('/',protect,getGoals)
router.post('/',protect,setGoals)
router.put('/:id',protect,updateGoal)
router.delete('/:id',protect,deleteGoal)



 











module.exports=router