import { ProfileEntity } from './profile.entity';
import { webinarEntity } from './webinar.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("transaction")
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    price: number; //??

    @ManyToOne(() => ProfileEntity, (profile) => profile.transaction)
    @JoinColumn()
    profile: ProfileEntity;

    @ManyToOne(() => webinarEntity, (webinar) => webinar.transactions)
    @JoinColumn()
    webinar: webinarEntity;
}