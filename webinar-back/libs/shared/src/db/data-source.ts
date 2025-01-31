import { DataSource, DataSourceOptions } from "typeorm";
import { CertificateEntity } from "../entities/certificate.entity";
import { EpisodeEntity } from "../entities/episode.entity";
import { EpisodeComments } from "../entities/episodeComment.entity";
import { ManagerEntity } from "../entities/manager.entity";
import { ProfileEntity } from "../entities/profile.entity";
import { SubCategoryEntity } from "../entities/subCategory.entity";
import { TransactionEntity } from "../entities/transaction.entity";
import { userEntity } from "../entities/user.entity";
import { webinarEntity } from "../entities/webinar.entity";
import { WebinarCategoryEntity } from "../entities/webinarCategory.entity";
import { webinarFilesEntity } from "../entities/webinarFiles.entity";

export const dataSourceOption : DataSourceOptions = {
    type : 'mysql',
    // url : process.env.DATABASE_URL,
    port: 3306,
    host : "localhost",
    username : "root",
    password : "123456",
    database : "nestjs",
    // host : process.env.
    // url : "jdbc:mysql://root:3306/nestjs",
    entities : [userEntity,CertificateEntity,EpisodeEntity,ManagerEntity,ProfileEntity,TransactionEntity,webinarEntity,WebinarCategoryEntity,webinarFilesEntity,SubCategoryEntity,EpisodeComments],
    migrations : ['dist/apps/auth/db/migrations/*.js']
}


export const F = new DataSource(dataSourceOption);