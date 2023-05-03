import express  from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js'
import { changeAccountStatusController, getAllDoctorsController, getAllUserController } from "../controllers/adminController.js";
//router onject
const router = express.Router();

//Get users || get
router.get('/get-all-user',authMiddleware,getAllUserController)
//get docters || get
router.get('/get-all-doctors',authMiddleware,getAllDoctorsController)
//Account status || post
router.post('/change-account-status',authMiddleware,changeAccountStatusController)


export default router