import { DataSource, DataSourceOptions } from "typeorm";
import { CertificateEntity } from "../entities/certificate.entity";
import { EpisodeEntity } from "../entities/episode.entity";
import { ManagerEntity } from "../entities/manager.entity";
import { ProfileEntity } from "../entities/profile.entity";
import { TransactionEntity } from "../entities/transaction.entity";
import { userEntity } from "../entities/user.entity";
import { webinarEntity } from "../entities/webinar.entity";
import { WebinarCategory } from "../entities/webinarCategory.entity";
import { webinarFilesEntity } from "../entities/webinarFiles.entity";

export const dataSourceOption : DataSourceOptions = {
    type : 'mysql',
    url : process.env.DATABASE_URL,
    // host : process.env.
    // url : "jdbc:mysql://root:3306/nestjs",
    entities : [userEntity,CertificateEntity,EpisodeEntity,ManagerEntity,ProfileEntity,TransactionEntity,webinarEntity,WebinarCategory,webinarFilesEntity],
    migrations : ['dist/apps/auth/db/migrations/*.js']
}


export const F = new DataSource(dataSourceOption);