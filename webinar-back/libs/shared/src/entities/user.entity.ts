import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Roles, UserRoles } from "../enums/roles.enum";
import { ProfileEntity } from "./profile.entity";

@Entity("users")
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
    phoneNumber: string; // ?? // with prefix

    @Column({nullable: true})
    whatsAppNumber: string; //??

    @Column({default: Roles.USER,enum: UserRoles, type: "enum"})
    role: UserRoles

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
        this.username = this.username.toLowerCase();
    }
}