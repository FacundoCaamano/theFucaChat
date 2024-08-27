import { Router } from "express";
import UserController from "../controllers/user.controller";



const router = Router()

router.post('/register-user', UserController.register)

export default router