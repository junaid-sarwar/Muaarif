import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './database/db.js';
import Stripe from 'stripe';

dotenv.config();

// Initialize Stripe with your Secret Key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Using Middlewares
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Server is Working");
});

app.use("/uploads", express.static("uploads"));

// Importing Routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

// Using Routes
app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
    connectDb();
});
