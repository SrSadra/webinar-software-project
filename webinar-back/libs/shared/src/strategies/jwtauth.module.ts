import { userRepository } from './../interfaces/repos/user.repository';
import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userEntity } from "../entities/user.entity";
import { jwtStrategy } from "./jwt.strategy";
import { managerRepository } from '../interfaces/repos/manager.repository';
import { ManagerEntity } from '../entities/manager.entity';

// @Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([userEntity,ManagerEntity]), // Provide User repository
        // PassportModule.register({ defaultStrategy: 'jwt' }),
        // JwtModule.registerAsync({
        //   imports: [ConfigModule],
        //   useFactory: async (configService: ConfigService) => ({
        //     secret: configService.get('JWT_SECRET'),
        //     signOptions: { expiresIn: '1h' },
        //   })
        //   ,
        //   inject: [ConfigService],
        // }),
      ],
      providers: [jwtStrategy,userRepository,managerRepository],
      exports: [jwtStrategy],
})
export class jwtAuthModule {

}