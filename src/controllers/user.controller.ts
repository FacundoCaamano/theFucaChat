import { Request, Response } from "express"
import mongoose from "mongoose"
import UserModel from "../models/message.model"
import { register } from "../services/user-service"
class UserController{
    
    async register(req:Request,res:Response){
        const userName = req.body.username
        const userpassword = req.body.password
        
        
         const user = await register(userName, userpassword)
         res.status(201).json(user)
    }

    async login(){

    }
}

export default new UserController()