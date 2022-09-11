const express=require('express')
const router=express.Router()
const {regiesterUser,loginUser,getMe,getUser,getUserbyId,deleteUser,editUser}=require('../controollers/userController')
const{protect}=require('../middleware.js/authMiddleware')


router.post('/',regiesterUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.get('/getUser',protect,getUser)
router.get('/getUser/:id',getUserbyId)
router.post('/getUser/:id',deleteUser)
router.post('/getUser/edit/:id',editUser)















module.exports=router;