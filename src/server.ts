import express from "express";
import { AppDataSource } from "./ormconfig";
import userRouter from "./routes/user";
import restaurantRouter from "./routes/restaurant";
import orderRouter from "./routes/order";
import itemRouter from "./routes/item";
import orderitemRouter from "./routes/orderitem";

const app = express();
app.use(express.json());

app.use("/", (req,res) => {
    res.send("Welcome to the Home Page");
});

app.use("/users", userRouter)
app.use("/restaurants", restaurantRouter)
app.use("/orders", orderRouter)
app.use("/items", itemRouter)
app.use("/orderitems", orderitemRouter)

const PORT = 5000;

// Start Express server after DB is connected
AppDataSource.initialize()
    .then(() => {
        console.log("📌 Database Connected Successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error("❌ Database Connection Failed:", error));