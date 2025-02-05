import { Router, Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Restaurants } from "../entities/Restaurants";

const router = Router();

// Get all users
router.get('/all', async (req: Request, res: Response) => {
    const restaurantRepository = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepository.find();
    res.json(restaurants);
});

// Get a single user by ID
router.get('/:id', async (req: Request, res: Response) => {
    const restaurantRepository = AppDataSource.getRepository(Restaurants);
    const restaurant = await restaurantRepository.findOneBy({ id: parseInt(req.params.id) });
    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
    const restaurantRepository = AppDataSource.getRepository(Restaurants);
    const newRestaurant = restaurantRepository.create(req.body);
    const result = await restaurantRepository.save(newRestaurant);
    res.json(result);
});

// Update a user by ID
router.put('/:id', async (req: Request, res: Response) => {
    const restaurantRepository = AppDataSource.getRepository(Restaurants);
    const restaurantId = parseInt(req.params.id);
    const restaurant = await restaurantRepository.findOneBy({ id: restaurantId });
    if (restaurant) {
        restaurantRepository.merge(restaurant, req.body);
        const result = await restaurantRepository.save(restaurant);
        res.json(result);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const restaurantRepository = AppDataSource.getRepository(Restaurants);
    const result = await restaurantRepository.delete(req.params.id);
    if (result.affected) {
        res.json({ message: "Restaurant deleted" });
    } else {
        res.status(404).json({ message: "Restaurant not found" });
    }
});

export default router;