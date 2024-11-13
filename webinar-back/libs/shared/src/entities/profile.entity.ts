import { CertificateEntity } from './certificate.entity';
import { Column, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { userEntity } from "./user.entity";
import { webinarEntity } from "./webinar.entity";
import { TransactionEntity } from './transaction.entity';
import { GraduationStatus } from '../enums/graduationStatus.enum';

export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => userEntity, (user) => user.profile)
    @JoinColumn({name: "username"})
    user: userEntity;

    @Column({nullable: true})
    graduation: GraduationStatus

    //fieldStudy ??

    @ManyToMany(() => webinarEntity, (webinar) => webinar.participants)
    webinar: webinarEntity[];

    @OneToMany(() => CertificateEntity, (certificate) => certificate.profile)
    certificates: CertificateEntity[];

    @OneToMany(() => TransactionEntity, (transaction) => transaction.profile)
    transaction: TransactionEntity[];


}