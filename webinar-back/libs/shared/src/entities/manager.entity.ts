import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ManagerRoles } from "../enums/roles.enum";
import { webinarEntity } from "./webinar.entity";

@Entity("manager")
export class ManagerEntity {
    @PrimaryColumn()
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

    @Column({default: ManagerRoles.MANAGER})
    role: string;

    @OneToMany(type => webinarEntity, (webinar) => webinar.creator)
    webinars: webinarEntity[];
}