import { CertificateEntity } from "@app/shared/entities/certificate.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";


@Injectable()
export class certificateRepository extends BaseAbstractRepository<CertificateEntity> {
    constructor(@InjectRepository(CertificateEntity) private readonly certificateRep: Repository<CertificateEntity>){
        super(certificateRep);
    }

    public async findByTitle(title: string) : Promise<CertificateEntity>{
        return await this.certificateRep.findOneBy({title});
    }
}