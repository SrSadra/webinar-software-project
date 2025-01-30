import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";


// @Entity()
// export class userDocument {
//     @PrimaryGeneratedColumn()
//     id : number;

//     @Column()
//     title: string;

//     @Column()
//     imageLink: string;

//     @ManyToOne(() =)
//     @JoinColumn()
//     user: ProfileEntity;

// }