import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { userEntity } from '@app/shared/entities/user.entity';
import { webinarEntity } from '@app/shared/entities/webinar.entity';
import { PurchaseWebinar } from '@app/shared/interfaces/purchase-webinar.interface';
import { transactionRepository } from '@app/shared/interfaces/repos/transaction.repository';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class PaymentService {
    constructor(@Inject("WEBINAR_SERVICE") private readonly webinarSer : ClientProxy,@Inject("USER_SERVICE") private readonly userSer: ClientProxy, private readonly jwtSer: JwtService, private readonly transactionRep : transactionRepository ){}

    async purchaseWebinar(webinarSlug: string){
        const $ob = this.webinarSer.send<PurchaseWebinar>({cmd: "find-webinar-by-slug"}, {slug: webinarSlug}).pipe(timeout(10000)); // Timeout after 5 seconds
        let webinar: PurchaseWebinar = await firstValueFrom($ob).catch((err) => err);
        // continue??
        if (webinar){
            const discount = webinar.discountPercent;
            let finalPrice = webinar.price;
            if (discount){
                finalPrice *= (100 - discount)/100;
            }
            delete webinar.discountPercent;
            return {...webinar,finalPrice};
        }

    }

    async startPurchase(webinarSlug: string, discountPercent: number){
        return this.jwtSer.sign({webinarSlug, discountPercent});
    }

    async donePurchase(webinar: PurchaseWebinar, username: string){
        const {discountPercent, price} = webinar;
        const $ob1 = this.userSer.send<ProfileEntity>({cmd: "get-profile"}, {username}).pipe(timeout(10000)); // Timeout after 5 seconds
        let profile: ProfileEntity = await firstValueFrom($ob1).catch((err) => err);
        const $ob2 = this.webinarSer.send<PurchaseWebinar>({cmd: "add-participant-webinar"}, {webinarId: webinar.id, profile}).pipe(timeout(10000)); // Timeout after 5 seconds
        let foundedWebinar: webinarEntity = await firstValueFrom($ob2).catch((err) => err);
        const finalPrice = ((100 - discountPercent) / 100) * price;
        const transaction = this.transactionRep.create({
            date: new Date(),
            price: finalPrice,
            profile,
            webinar: foundedWebinar // pure webinar
        });
        return await this.transactionRep.save(transaction);
    }
}
