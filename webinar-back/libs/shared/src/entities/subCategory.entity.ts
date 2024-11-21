import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { webinarEntity } from "./webinar.entity";
import { WebinarCategory } from "./webinarCategory.entity";

@Entity("sub-categories")
export class SubCategoryEntity {
    @PrimaryColumn()
    title: string;

    @ManyToOne(() => WebinarCategory, (category) => category.subCategory)
    @JoinColumn()
    category: WebinarCategory;

    @ManyToMany(() => webinarEntity, (webinar) => webinar.subcategories)// cascade option should be defined in only one side
    @JoinTable({name : "webinar-subcategory"})
    webinar: webinarEntity[];
}