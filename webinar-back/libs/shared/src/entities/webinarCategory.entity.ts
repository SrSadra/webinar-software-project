import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";
import { SubCategoryEntity } from "./subCategory.entity";
import { webinarEntity } from "./webinar.entity";

@Entity("categories")
export class WebinarCategory{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    title: string;

    @OneToMany(() => SubCategoryEntity, (subcategory) => subcategory.category)
    subCategory: SubCategoryEntity[];

    @Column({default: true})
    isActive: boolean;

    @OneToMany(() => webinarEntity, (webinar) => webinar.category)
    webinar: webinarEntity[];
}