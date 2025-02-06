import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Min } from "class-validator";
import { Restaurants } from "./Restaurants";

@Entity()
export class Items {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 30 })
    name: string

    @Column()
    @Min(0)
    price: number

    @Column("varchar", { length: 100 })
    description: string

    @ManyToOne(() => Restaurants, (restaurant) => restaurant.items)
    restaurent: Restaurants
}