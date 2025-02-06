import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
  } from "typeorm";
  import { Items } from "./Items";
  import { Users } from "./Users";
  import { Orders } from "./Orders";
  
  @Entity()
  export class Restaurants {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("varchar", { length: 30 })
    name: string;
  
    @Column("varchar", { length: 50 })
    address: string;
  
    @Column("varchar", { length: 10 })
    phone: string;
  
    @OneToMany(() => Items, (items) => items.restaurent)
    items: Items[];
  
    @ManyToMany(() => Users, (users) => users.restaurants)
    users: Users[];
  
    @OneToMany(() => Orders, (orders) => orders.restaurant)
    orders: Orders[];
  }