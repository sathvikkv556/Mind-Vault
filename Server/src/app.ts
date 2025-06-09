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
app.use(cors({
  origin: "*",
  credentials: true
}));



app.use(cookieParser());
dbConnect();

app.use("/api/v1",router);
app.get('/', (req, res) => {
  res.send('Backend is working!');
});
if(process.env.NODE_ENV!="production"){
  app.listen(process.env.PORT,()=>{
  console.log("Server is runing on port"+process.env.PORT)
})}

export default app;