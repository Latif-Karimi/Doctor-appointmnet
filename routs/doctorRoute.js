import express from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js'
import {getDocterController, updatProfileController} from '../controllers/doctorController.js'

//router onject
const router = express.Router();

//post single Doc info
router.post('/getDoctorInfo', authMiddleware , getDocterController)
//update profile
router.post('/update-profile', authMiddleware,updatProfileController)
export default router;