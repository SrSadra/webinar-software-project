import { jwtGuard } from '@app/shared/guards/jwt.guard';
import { PurchaseGuard } from '@app/shared/guards/purchase.guard';
import { webinarRequest } from '@app/shared/interfaces/webinar-request.interface';
import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';


@Controller('billing')
export class ServiceController {
    constructor(private readonly paymentSer: PaymentService){}

    @Get("purchase/:slug")
    async GetWebinarPayment(@Param("slug") webinarSlug : string){
        return await this.paymentSer.purchaseWebinar(webinarSlug);
    }

    @UseGuards(jwtGuard)
    @Post("startpurchase")
    async startPurchase(@Body("slug") slug: string,@Body("discountPercent") discountPercent: number ,@Res() res : Response){
        console.log("alooo");
        const token = await this.paymentSer.startPurchase(slug, discountPercent);
        console.log(token);
        res.cookie('purchaseToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 10 * 60 * 1000, // 1 minutes
        });
        // return ??
        return res.status(200).json({ message: 'Purchase started', token });
    }


    @UseGuards(jwtGuard, PurchaseGuard)
    @Post("done")
    donePurchase(@Req() req : webinarRequest, @Res() res : Response){
        console.log("aj", req.user, req.webinar); 
        const transaction = this.paymentSer.donePurchase(req.webinar,req.user.username);// this is personalized webinar
        res.clearCookie("purchaseToken" , {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        return res.status(200).json({ message: 'Purchase completed', transaction });
    }

}
