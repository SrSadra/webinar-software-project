import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { webinarEntity } from "./webinar.entity";

export class WebinarCategory{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    title: string;

    @Column()
    subCategory: string[];

    @ManyToMany(() => webinarEntity, (webinar) => webinar.category)
    webinar: webinarEntity[];
}