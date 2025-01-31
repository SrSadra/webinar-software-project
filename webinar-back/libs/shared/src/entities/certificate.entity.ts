import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Entity("certificates")
export class CertificateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    imageLink: string;

    @ManyToOne(() => ProfileEntity, (profile) => profile.certificates)
    @JoinColumn({name: "profile_id"})
    profile: ProfileEntity;
}