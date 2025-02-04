import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Restaurants } from "./Restaurants";
import { Users } from "./Users";
import { OrderItems } from "./OrderItems";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column()
    orderdate: Date

    @Column()
    status: "Pending" | "Complete"

    @ManyToOne(() => Restaurants, (restaurant) => restaurant.orders)
    restaurant: Restaurants

    @ManyToOne(() => Users, (user) => user.orders)
    user: Users

    @OneToMany(() => OrderItems, (orderitems) => orderitems.order)
    orderitems: OrderItems[]
}