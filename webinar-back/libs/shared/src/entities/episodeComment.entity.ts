import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EpisodeEntity } from "./episode.entity";
import { ProfileEntity } from "./profile.entity";

@Entity("comments")
export class EpisodeComments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" }) 
    comment: string;

    @CreateDateColumn({ type: "timestamp" }) 
    createdAt: Date; // Auto-filled on insert

    @UpdateDateColumn({ type: "timestamp" }) 
    updatedAt: Date; // Auto-updated on edit

    // @Column({ default: false }) 
    // isEdited: boolean; // Track if comment was modified

    @ManyToOne(() => ProfileEntity, (profile) => profile.comments, { onDelete: "CASCADE" }) 
    @JoinColumn()
    author: ProfileEntity; // The user who wrote the comment

    @ManyToOne(() => EpisodeEntity, (episode) => episode.comments, { onDelete: "CASCADE" }) 
    @JoinColumn()
    episode: EpisodeEntity; // The episode being commented on

    // @ManyToOne(() => EpisodeComments, (comment) => comment.replies, { nullable: true, onDelete: "CASCADE" })  for bonus
    // parentComment?: EpisodeComments; // Parent comment for replies 

    // @OneToMany(() => EpisodeComments, (comment) => comment.parentComment) 
    // replies: EpisodeComments[]; // Nested replies
}