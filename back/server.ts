import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

app.get("/api/data", (req: Request, res: Response) => {
  res.json({ message: "This is sample data from the API." });
});

// Start server with port fallback
const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
