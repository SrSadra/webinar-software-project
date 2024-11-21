import { TransactionEntity } from './transaction.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { webinarStatus } from "../enums/webinarStatus.enum";
import { EpisodeEntity } from "./episode.entity";
import { ManagerEntity } from "./manager.entity";
import { ProfileEntity } from "./profile.entity";
import { userEntity } from "./user.entity";
import { webinarFilesEntity } from "./webinarFiles.entity";
import { WebinarCategory } from './webinarCategory.entity';
import { SubCategoryEntity } from './subCategory.entity';

@Entity("webinars")
export class webinarEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    persianTitle: string;

    @Column()
    englishTitle: string;

    @Column({default: webinarStatus.IN_PROGRESS})
    status: number;

    @Column()
    description: string;

    @Column()
    image:string; //???

    @Column()
    price: number;

    @Column({nullable : true})
    discountPercent?: number;

    @Column()
    invitationLink: string;

    @Column({default: false})
    onlyDoctor: boolean;

    @ManyToOne(type => ManagerEntity, (creator) => creator.webinars)
    creator: ManagerEntity;

    @OneToMany(type => EpisodeEntity, (episode) => episode.webinar)
    episodes: EpisodeEntity[];

    @ManyToMany(() => ProfileEntity, (participant) => participant.webinar)
    @JoinTable({name: "webinar_participant"})
    participants: ProfileEntity[];

    @OneToMany(() => TransactionEntity, (transaction) => transaction.webinar)
    transactions: TransactionEntity[];

    @ManyToOne(() => WebinarCategory, (category) => category.webinar)
    // @JoinTable({name: "webibnar-cattegory"})
    category: WebinarCategory;

    @ManyToMany(() => SubCategoryEntity, (subcategory) => subcategory.webinar, {cascade : true})// to enable row deletion when we delete one side of relation
    subcategories: SubCategoryEntity[];

}