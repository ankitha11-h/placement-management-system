import dotenv from 'dotenv';
import dns from "dns";
import app from './src/app.js';
import connectDB from './src/config/db.js';


dns.setServers(["2405:201:d02c:c072::c0a8:1d01"]);


dotenv.config();

const PORT = 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Database connection failed:", error);
    });