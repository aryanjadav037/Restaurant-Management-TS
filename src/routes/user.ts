import { Router, Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Users } from "../entities/Users";

const router = Router();

// Get all users
router.get('/all', async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(Users);
    const users = await userRepository.find();
    res.json(users);
});

// Get a single user by ID
router.get('/:id', async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Create a new user
router.post('/users', async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(Users);
    const newUser = userRepository.create(req.body);
    const result = await userRepository.save(newUser);
    res.json(result);
});

// Update a user by ID
router.put('/users/:id', async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(Users);
    const userId = parseInt(req.params.id);
    const user = await userRepository.findOneBy({ id: userId });
    if (user) {
        userRepository.merge(user, req.body);
        const result = await userRepository.save(user);
        res.json(result);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete a user by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(Users);
    const result = await userRepository.delete(req.params.id);
    if (result.affected) {
        res.json({ message: "User deleted" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

export default router;