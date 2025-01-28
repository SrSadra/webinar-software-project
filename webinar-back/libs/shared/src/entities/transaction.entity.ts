import { ProfileEntity } from './profile.entity';
import { webinarEntity } from './webinar.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("transaction")
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column()
    price: number; //??

    @ManyToOne(() => ProfileEntity, (profile) => profile.transaction, {cascade: true})
    @JoinColumn()
    profile: ProfileEntity;

    @ManyToOne(() => webinarEntity, (webinar) => webinar.transactions, {onUpdate: "CASCADE"})
    @JoinColumn()
    webinar: webinarEntity;
}