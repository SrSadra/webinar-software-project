import { TransactionEntity } from './transaction.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { webinarStatus } from "../enums/webinarStatus.enum";
import { EpisodeEntity } from "./episode.entity";
import { ManagerEntity } from "./manager.entity";
import { ProfileEntity } from "./profile.entity";
import { userEntity } from "./user.entity";
import { webinarFilesEntity } from "./webinarFiles.entity";
import { WebinarCategoryEntity } from './webinarCategory.entity';
import { SubCategoryEntity } from './subCategory.entity';
import { slugify } from '../constants/constants';

@Entity("webinars")
export class webinarEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    slug: string;

    @Column()
    persianTitle: string;

    @Column()
    englishTitle: string;

    @Column({type: 'enum', enum: webinarStatus ,default: webinarStatus.IN_PROGRESS})
    status: webinarStatus;

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

    @JoinColumn()
    @ManyToOne(type => ManagerEntity, (creator) => creator.webinars, {cascade: true, onUpdate: "CASCADE"})
    creator: ManagerEntity;

    @JoinColumn()
    @ManyToOne(type => ProfileEntity, (teacher) => teacher.webinarTeacher, {cascade: true, onUpdate: "CASCADE", nullable: true})
    teacher: ProfileEntity;

    @OneToMany(type => EpisodeEntity, (episode) => episode.webinar)
    episodes: EpisodeEntity[];

    @ManyToMany(() => ProfileEntity, (participant) => participant.webinar, {cascade: true})
    @JoinTable({name: "webinar_participant"})
    participants: ProfileEntity[];

    @OneToMany(() => TransactionEntity, (transaction) => transaction.webinar)
    transactions: TransactionEntity[];

    
    @ManyToOne(() => WebinarCategoryEntity, (category) => category.webinar, {cascade: true})
    @JoinColumn()
    category: WebinarCategoryEntity;

    @ManyToMany(() => SubCategoryEntity, (subcategory) => subcategory.webinar)// to enable row deletion when we delete one side of relation
    subcategories: SubCategoryEntity[];

    
    @BeforeInsert()
    // @BeforeUpdate()
    generateSlug() {
      if (!this.slug && this.englishTitle) {
        this.slug = slugify(this.englishTitle); // Generate slug synchronously
      }
    }

}