import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";

export class CertificateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageLink: string;

    @ManyToOne(() => ProfileEntity, (profile) => profile.certificates)
    @JoinColumn({name: "profile_id"})
    profile: ProfileEntity;
}