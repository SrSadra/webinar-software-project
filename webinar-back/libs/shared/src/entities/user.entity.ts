import { BeforeInsert, BeforeUpdate, Column, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../enums/roles.enum";
import { ProfileEntity } from "./profile.entity";

export class userEntity {
    @PrimaryColumn()
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    persianN?: string;

    @Column({nullable: true})
    firstname?: string;

    @Column({nullable: true})
    lastname?: string;

    @Column({nullable: true})
    nationalCode?: number;

    @Column({unique: true})
    phoneNumber: string; // ??

    @Column({nullable: true})
    whatsAppNumber: string; //??

    @Column()
    role: Roles

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
        this.username = this.username.toLowerCase();
    }
}