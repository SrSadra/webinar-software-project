import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { webinarEntity } from "./webinar.entity";
import { WebinarCategoryEntity } from "./webinarCategory.entity";

@Entity("sub-categories")
export class SubCategoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => WebinarCategoryEntity, (category) => category.subCategory, {cascade: true})
    @JoinColumn({name : "categoryId"})
    category: WebinarCategoryEntity;

    @ManyToMany(() => webinarEntity, (webinar) => webinar.subcategories)// cascade option should be defined in only one side
    @JoinTable({name : "webinar-subcategory"})
    webinar: webinarEntity[];
}