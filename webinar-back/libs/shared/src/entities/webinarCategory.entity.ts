import { Column, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategoryEntity } from "./subCategory.entity";
import { webinarEntity } from "./webinar.entity";

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