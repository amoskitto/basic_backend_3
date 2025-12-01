import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: './.env'
});


const startServer = async () => {
    try {
        await connectDB();

        app.on("eror", (error) => {
            console.log("server error: ", error);
            throw error;
        });
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port:
                ${process.env.PORT}`)
        })
    }catch (error){
        console.error("Failed to start server:", error); // <-- log the error
        process.exit(1);

    }
}

startServer();