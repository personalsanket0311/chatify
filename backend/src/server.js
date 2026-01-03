import express from 'express';

import path from 'path';

import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.routes.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';


const app = express();
const __dirname = path.resolve();
const PORT =ENV.PORT || 3000;

// Add these middleware
app.use(express.json());  // req.body

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// Fix the NODE_ENV check and paths
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/chatify/dist")));
    
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/chatify/dist/index.html"));
    });
}

console.log("NODE_ENV:", ENV.NODE_ENV);

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
    connectDB()
});