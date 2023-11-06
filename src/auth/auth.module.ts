import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserRepository} from "./user.repository";
import {TypeOrmExModule} from "../modules/typeorm.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal : true,
            envFilePath : '.env.dev'
        }),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: 600 * 60
            }
        }),
        // user repository에 접근가능하게 모듈에 등록
        TypeOrmExModule.forCustomRepository([UserRepository])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, ConfigService],
    exports : [JwtStrategy, PassportModule]
})
export class AuthModule {}
