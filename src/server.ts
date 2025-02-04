import express from "express";
import { AppDataSource } from "./ormconfig";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("i'm home")
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
