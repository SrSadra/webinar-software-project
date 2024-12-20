import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { webinarEntity } from "./webinar.entity";
import { WebinarCategoryEntity } from "./webinarCategory.entity";

@Entity("sub-categories")
export class SubCategoryEntity {
    @PrimaryColumn()
    title: string;

    @ManyToOne(() => WebinarCategoryEntity, (category) => category.subCategory)
    @JoinColumn()
    category: WebinarCategoryEntity;

    @ManyToMany(() => webinarEntity, (webinar) => webinar.subcategories)// cascade option should be defined in only one side
    @JoinTable({name : "webinar-subcategory"})
    webinar: webinarEntity[];
}