import  express  from "express";
import colors from "colors"
import authRoute from './routs/authRoute.js'
import dotenv from "dotenv"
import connectDB from "./config/db.js";

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(express.json());


//routes
app.use('/api/user', authRoute)

//port
const port = process.env.PORT || 3001;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
