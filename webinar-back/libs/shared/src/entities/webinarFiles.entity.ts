import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EpisodeEntity } from "./episode.entity";
import { webinarEntity } from "./webinar.entity";

@Entity("webinar-files")
export class webinarFilesEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    webinarId: number;

    @Column()
    filePath: string;

    @ManyToOne(type => EpisodeEntity, (webinarEpisode) => webinarEpisode.files)
    webinar: EpisodeEntity;
}