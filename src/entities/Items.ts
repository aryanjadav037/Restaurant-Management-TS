import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurants } from "./Restaurants";

@Entity()
export class Items {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    description: string

    @ManyToOne(() => Restaurants, (restaurant) => restaurant.items)
    restaurent: Restaurants
}