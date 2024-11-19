import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { webinarEntity } from "./webinar.entity";
import { WebinarCategory } from "./webinarCategory.entity";

@Entity()
export class SubCategoryEntity {
    @Column()
    title: string;

    @ManyToOne(() => WebinarCategory, (category) => category.subCategory)
    @JoinColumn()
    category: WebinarCategory;

    @ManyToMany(() => webinarEntity, (webinar) => webinar.subcategories, {cascade: true})
    @JoinTable({name : "webinar-subcategory"})
    webinar: webinarEntity[];
}