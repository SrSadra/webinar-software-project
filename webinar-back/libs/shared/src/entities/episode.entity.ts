import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EpisodeComments } from "./episodeComment.entity";
import { webinarEntity } from "./webinar.entity";
import { webinarFilesEntity } from "./webinarFiles.entity";

@Entity("episodes")
export class EpisodeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @ManyToOne(type => webinarEntity, (webinar) => webinar.episodes,{onDelete: "CASCADE", onUpdate: "CASCADE"})
    webinar: webinarEntity;

    @OneToMany(type => webinarFilesEntity, (file) => file.webinarEpisode)
    files: webinarFilesEntity[]

    @OneToMany(type => EpisodeComments, (comment) => comment.episode)
    comments: EpisodeComments[];

}