import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Restaurants } from "./Restaurants";
import { Orders } from "./Orders";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    mobileno: string

    @Column()
    email: string

    @Column()
    address: string

    @ManyToMany(() => Restaurants, (restaurants) => restaurants.users)
    restaurants: Restaurants[]

    @OneToMany(() => Orders, (orders) => orders.user)
    orders: Orders[]
}