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
      "https://personal-tm.vercel.app",
        ],
    credentials: "include",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/api/task", taskRoutes); 
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
