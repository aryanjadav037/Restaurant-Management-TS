import { Router, Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Items } from "../entities/Items";

const router = Router();

// Get all users
router.get('/all', async (req: Request, res: Response) => {
    const itemRepository = AppDataSource.getRepository(Items);
    const items = await itemRepository.find();
    res.json(items);
});

// Get a single user by ID
router.get('/:id', async (req: Request, res: Response) => {
    const itemRepository = AppDataSource.getRepository(Items);
    const item = await itemRepository.findOneBy({ id: parseInt(req.params.id) });
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "item not found" });
    }
});

// Create a new user
router.post('/items', async (req: Request, res: Response) => {
    const itemRepository = AppDataSource.getRepository(Items);
    const newItem = itemRepository.create(req.body);
    const result = await itemRepository.save(newItem);
    res.json(result);
});

// Update a user by ID
router.put('/items/:id', async (req: Request, res: Response) => {
    const itemRepository = AppDataSource.getRepository(Items);
    const itemId = parseInt(req.params.id);
    const item = await itemRepository.findOneBy({ id: itemId });
    if (item) {
        itemRepository.merge(item, req.body);
        const result = await itemRepository.save(item);
        res.json(result);
    } else {
        res.status(404).json({ message: "item not found" });
    }
});

// Delete a user by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
    const itemRepository = AppDataSource.getRepository(Items);
    const result = await itemRepository.delete(req.params.id);
    if (result.affected) {
        res.json({ message: "Item deleted" });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

export default router;