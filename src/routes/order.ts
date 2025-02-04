import { Router, Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Orders } from "../entities/Orders";

const router = Router();

// Get all orders
router.get("/all", async (req: Request, res: Response) => {
    const orderRepository = AppDataSource.getRepository(Orders);
    const orders = await orderRepository.find();
    res.json(orders);
});

// Get a single order by ID
router.get("/:id", async (req: Request, res: Response) => {
    const orderRepository = AppDataSource.getRepository(Orders);
    const order = await orderRepository.findOneBy({ id: parseInt(req.params.id) });
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});


