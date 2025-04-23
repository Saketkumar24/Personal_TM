import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
dbConnection();

const PORT = process.env.PORT || 8800;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://prismatic-lokum-aadc9d.netlify.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use("/api", routes);
app.use("/api/task", taskRoutes); 

app.use(routeNotFound);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
