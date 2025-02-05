import express from "express";
import { AppDataSource } from "./ormconfig";
import orderRoutes from "./routes/order";
import orderItemRoutes from "./routes/orderitem";
import userRoutes from "./routes/user";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to the Order Management System</h1>`);
});

// Register routes
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemRoutes);
app.use("/user", userRoutes);

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