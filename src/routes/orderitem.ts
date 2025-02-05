import { Router, Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Orders } from "../entities/Orders";
import { Items } from "../entities/Items";
import { OrderItems } from "../entities/OrderItems";

const router = Router();

// add item in order
router.post('/:id/item/:itemId', async (req: Request, res: Response) => {
    const orderRepository = AppDataSource.getRepository(Orders);
    const orderitemRepository = AppDataSource.getRepository(OrderItems);
    const price = AppDataSource.getRepository(Items).createQueryBuilder("item").select("item.price").where("item.id = :id", { id: req.params.itemId });
    const itemId = parseInt(req.params.itemId);
    const orderId = parseInt(req.params.id);
    const { quantity } = req.body;
    const priceResult = await price.getOne();

    if(!priceResult){
        res.status(404).json({ message: "Item not found" });
        return;
    }

    const newPrice = priceResult.price * quantity;
    const newOrderItem = orderitemRepository.create({ quantity , price: newPrice,order: {id: orderId} });
    
    const result = await orderitemRepository.save(newOrderItem);


    
    res.json(result);
});

export default router;