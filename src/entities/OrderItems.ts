import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Orders } from "./Orders";
import { Items } from "./Items";

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

    @OneToOne(() => OrderItems, (orderitems) => orderitems.item)
    item: Items
}