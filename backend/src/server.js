import express from 'express';
import path from 'path';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.routes.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// 👇 BODY PARSERS FIRST (before routes!)
app.use(express.json());           // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cookieParser());        // For cookies

// 👇 ROUTES SECOND
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// 👇 Static files LAST (production only)
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/chatify/dist")));
    
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/chatify/dist/index.html"));
    });
}

console.log("NODE_ENV:", ENV.NODE_ENV);

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
    connectDB();
});
