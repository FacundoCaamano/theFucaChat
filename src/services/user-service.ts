import { genSalt, hash } from "bcrypt"
import UserModel from "../models/message.model"
import jwt from 'jsonwebtoken'

export const register = async (username:string, password:string) => {
     const salt = await genSalt(10)
     const passHash = await hash(password,salt)
     
     const newUser = await UserModel.create({userName:username,password:passHash})
    
    const token =  generateToken(newUser._id.toString())
     return { user: newUser }
     
}

 const generateToken:any = (userId:string)=>{
      
      const key = process.env.SECRET_KEY as string
      const token = jwt.sign(userId,key)
      return token
}