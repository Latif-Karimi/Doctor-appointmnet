import  express  from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js'
import { authController, loginController, registerController } from "../controllers/authController.js";

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);
export default router;
