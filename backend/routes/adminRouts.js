const express=require('express')
const router=express.Router()
const {getUser,getUserbyId,deleteUser,editUser}=require('../controollers/userController')
//protect route middleware
const{protect}=require('../middleware.js/authMiddleware')

router.get('/',protect,getUser)
router.get('/finduser/:id',getUserbyId)
router.delete('/deleteuser/:id',deleteUser)
router.post('/edituser/:id',editUser)



module.exports=router;