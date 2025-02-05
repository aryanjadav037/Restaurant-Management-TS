import { Router, Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Orders } from "../entities/Orders";
import { Items } from "../entities/Items";

const router = Router();

// Create a new order
router.post('/:id/item/:itemId', async (req: Request, res: Response) => {
    const orderRepository = AppDataSource.getRepository(Orders);
    const price = AppDataSource.getRepository(Items).createQueryBuilder("item").select("item.price").where("item.id = :id", { id: req.params.itemId });
    const itemId = parseInt(req.params.itemId);
    const orderId = parseInt(req.params.id);
    const { quantity } = req.body;
    const priceResult = await price.getOne();

    const totalPrice = parseFloat(priceResult * quantity);
    
    res.json();
});

export default router;