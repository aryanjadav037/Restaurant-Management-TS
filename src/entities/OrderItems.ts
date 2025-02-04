import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Orders } from "./Orders";

@Entity()
export class OrderItems {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity:  number

    @Column()
    price: number

    @ManyToOne(() => Orders, (order) => order.orderitems)
    order: Orders
}