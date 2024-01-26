import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username:{
    type:'String',
    required: true,
  },
  email:{
    type:'String',
    required: true,
  },
  authentication:{
    password:{
      type:'String',
      required: true,
      select: false,
    },
    salt: {
      type:'String',
      required: true,
      select: false,
    },
    sessionToken:{
      type:'String',
      required: true,
      select: false,
    },
  },
})

export const userModel = mongoose.model('user', schema)

export const getUsers = () =>{
    userModel.find()
}

export const getUsersByEmail = (email:string) =>{
  userModel.findOne({email})
}

export const getUsersBySesssionToken = (sessionToken:string) =>{
  userModel.findOne({
    'authentication.sessionToken': sessionToken,
  })
}

export const getusersById = (id:String) =>{
userModel.findById(id)
}

export const createUser = (values: Record<string ,any>) =>{
    new userModel(values).save().then((user)=>{
      user.toObject()
    })
}

export const deleteUserById = (id:string)=>{
  userModel.findOneAndDelete({_id:id})
}

export const updateUserById = (id:string , value: Record<string,any>) =>{
  userModel.findByIdAndUpdate(id, value)
}
