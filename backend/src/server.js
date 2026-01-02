import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.routes.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Add these middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// Fix the NODE_ENV check and paths
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/chatify/dist")));
    
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/chatify/dist/index.html"));
    });
}

console.log("NODE_ENV:", process.env.NODE_ENV);

app.listen(PORT, () => console.log('Server is running on port: ' + PORT));