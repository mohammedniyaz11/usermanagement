const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')




module.exports.regiesterUser=asyncHandler(async(req,res)=>{

    console.log('777777777777777777777777777777777777777777777777777777');
    const{name,email,password}=req.body;
    if(!name||!email||!password){
        res.status(400)
        throw new Error('Please add all thhe fields')
    }
  const userExist=await User.findOne({email})
  if(userExist){
      res.status(400)
      throw new Error('User Already Exist')
  }
  ////hasing password
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)

//ccreate
 const user=await User.create({
     name,
     email,
     password:hashedPassword
 })
 console.log(user)

if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
}else{
    res.status(400) 
    throw new Error('Invalid user data')

}
})







module.exports.loginUser=asyncHandler(async(req,res)=>{
  const{email,password}=req.body
  //check for email
  const user=await User.findOne({email})
  if(user && (await bcrypt.compare(password,user.password))){
      res.json({
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id)

      })
  }else{
      res.status(400)
      throw new Error('invalid user data')
  }
})




module.exports.getMe=asyncHandler(async(req,res)=>{
    const{_id,name,email}=await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email

    })
})



const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

module.exports.getUser=async(req,res)=>{
    const getuser=await User.find()
    res.json(getuser)                                      
}


module.exports.getUserbyId=async(req,res)=>{
    const{id}=req.params
    const getuserbyid=await User.findById(id)
    console.log(getuserbyid);
    res.json(getuserbyid)
}


module.exports.deleteUser=async(req,res)=>{
    const{id}=req.params
    const getuserbyid=await User.findByIdAndDelete(id)
    res.json({id})
}



module.exports.editUser=async(req,res)=>{
    const{id}=req.params
    const getuserbyid=await User.findByIdAndUpdate(id ,req.body)
    res.json(getuserbyid)
}








