import express from "express";
import { AppDataSource } from "./ormconfig";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("i'm home");
});

const PORT = 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });