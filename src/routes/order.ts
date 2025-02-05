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

// Create a new order
router.post("/new", async (req: Request, res: Response) => {
    const orderRepository = AppDataSource.getRepository(Orders);
    const newOrder = orderRepository.create(req.body);
    const result = await orderRepository.save(newOrder);
    res.json(result);
}); 

// Update an order by ID
router.put("/:id", async (req: Request, res: Response) => {
    const orderRepository = AppDataSource.getRepository(Orders);
    const orderId = parseInt(req.params.id);
    const order = await orderRepository.findOneBy({ id: orderId });
    if (order) {
        orderRepository.merge(order, req.body);
        const result = await orderRepository.save(order);
        res.json(result);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

// Delete an order by ID
router.delete("/delete/:id", async (req: Request, res: Response) => {
    const orderRepository = AppDataSource.getRepository(Orders);
    const result = await orderRepository.delete(req.params.id);
    if (result.affected) {
        res.json({ message: "Order deleted" });
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

export default router;