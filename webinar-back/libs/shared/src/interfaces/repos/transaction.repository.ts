import { FilterWebinarDto } from "@app/shared/dtos/filterwebinar.dto";
import { TransactionEntity } from "@app/shared/entities/transaction.entity";
import { DateFilter } from "@app/shared/enums/dateFilter.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

export class transactionRepository extends BaseAbstractRepository<TransactionEntity> {
    constructor(@InjectRepository(TransactionEntity) private transactionRep : Repository<TransactionEntity>){
        super(transactionRep);
    }

    async getFilteredWebinarsWithIncome(filterDto: FilterWebinarDto): Promise<any[]> {
        const { filterType, startDate, endDate } = filterDto;
      
        const query = this.transactionRep.createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.webinar', 'webinar');

        console.log(filterType);
      // Apply date filters based on the filter type
      if (filterType === DateFilter.TODAY) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        query.where('transaction.date BETWEEN :start AND :end', {
          start: today.toISOString(),
          end: tomorrow.toISOString(),
        });
      } else if (filterType === DateFilter.THIS_WEEK) {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        firstDayOfWeek.setHours(0, 0, 0, 0);

        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        lastDayOfWeek.setHours(23, 59, 59, 999);

        query.where('transaction.date BETWEEN :start AND :end', {
          start: firstDayOfWeek.toISOString(),
          end: lastDayOfWeek.toISOString(),
        });
      } else if (filterType === DateFilter.CUSTOM && startDate && endDate) {
        query.where('transaction.date BETWEEN :start AND :end', {
          start: new Date(startDate).toISOString(),
          end: new Date(endDate).toISOString(),
        });
      }

      // Calculate the total income for each webinar
      query
        .select('webinar.id', 'webinarId') // Select webinar ID
        .addSelect('webinar.englishTitle', 'webinarTitle') // Add webinar title
        .addSelect('webinar.persianTitle', 'persianTitle')
        .addSelect('SUM(transaction.price)', 'totalIncome') // Sum of transaction prices
        .groupBy('webinar.id'); // Group by webinar ID

      // Execute and return the results
      console.log(await query.getRawMany());
      return query.getRawMany();
      }
}
