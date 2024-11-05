import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { webinarEntity } from "./webinar.entity";

export class ManagerEntity {
    @PrimaryGeneratedColumn()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    persianN?: string;

    @Column({nullable: true})
    firstname?: string;

    @Column({nullable: true})
    lastname?: string;

    @Column()
    phoneNumber: string; // ??

    @OneToMany(type => webinarEntity, (webinar) => webinar.creator)
    webinars: webinarEntity[];
}