import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { JwtRequest } from "@app/shared/interfaces/jwt-request.interface";
import { userRepository } from "../interfaces/repos/user.repository";

export class jwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor(private readonly userRep : userRepository) {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([
            (request: JwtRequest) => {
              return request?.jwt;
            },
          ]),
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_SECRET,
        });
      }
    
    async validate(payload: any) { // we can check the token with db here or elsewhere
        const user = await this.userRep.findOneByEmail(payload.email);
        delete user.password;
        return user;
    }
}