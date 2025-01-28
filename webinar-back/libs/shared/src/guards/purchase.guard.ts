import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import { PurchaseWebinar } from "../interfaces/purchase-webinar.interface";

@Injectable()
export class PurchaseGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, @Inject("WEBINAR_SERVICE") private readonly webinarSer : ClientProxy ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['purchaseToken']; // Extract the token from cookies
    
    if (!token) {
      throw new UnauthorizedException('No purchase token found.');
    }

    try {
      const payload = this.jwtService.verify(token); // Verify the token
      console.log(payload);
      const $ob = this.webinarSer.send<PurchaseWebinar>({cmd: "find-webinar-by-slug"}, {slug: payload.webinarSlug }).pipe(timeout(10000)); // Timeout after 5 seconds
      let webinar: PurchaseWebinar = await firstValueFrom($ob).catch((err) => err);
      if (!webinar){
        throw Error();
      }
      request.webinar = {...webinar, discountPercent : payload.discountPercent}; // Attach webinarSlug to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired purchase token.');
    }
  }
}