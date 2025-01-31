import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { JwtRequest } from "@app/shared/interfaces/jwt-request.interface";
import { userRepository } from "../interfaces/repos/user.repository";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { managerRepository } from "../interfaces/repos/manager.repository";
import { userEntity } from "../entities/user.entity";
import { ManagerEntity } from "../entities/manager.entity";
import { Request } from "express";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy,"jwt"){
    constructor(private readonly userRep : userRepository, private readonly configSer: ConfigService,private readonly managerRep: managerRepository) {
      super({
        jwtFromRequest: 
        ExtractJwt.fromExtractors([
          (request: Request) => {
            // console.log(request?.cooki);
            // console.log("cookoo", request.cookies);
            
            return request.cookies.Authentication?.token;
          },
          ExtractJwt.fromAuthHeaderAsBearerToken() // or use as bearer
        ]),
        ignoreExpiration: false,
        secretOrKey : configSer.get("JWT_SECRET")
        }) 
      }
    
    async validate(payload: any) { // we can check the token with db here or elsewhere. return is used like req.user by @req 
      
      const payloadUser = payload.user;
      
      let isManager: userEntity | ManagerEntity = await this.managerRep.findOneByEmail(payloadUser.email);
      if (!isManager){
        isManager = await this.userRep.findOneByEmail(payloadUser.email);
      }
        delete isManager.password;
        return isManager;
    }
}