import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/pageRoutes";
import dbConnect from "./config/db";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
dotenv.config();
app.use(   
  cors(
    {
    origin: "https://mind-vault-r5mk-git-main-sathvikkv456s-projects.vercel.app", 
    credentials: true 
}            
));
app.use(cookieParser());
dbConnect();

app.use("/api/v1",router);


app.listen(process.env.PORT,()=>{
  console.log("Server is runing on port"+process.env.PORT)
})