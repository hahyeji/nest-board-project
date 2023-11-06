import {Body, Controller, Get, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialDto} from "./dto/auth-credential.dto";
import {AuthGuard} from "@nestjs/passport";
import {User} from "./user.entity";
import {GetUser} from "./get-user.decorator";
import {ConfigService} from "@nestjs/config";

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService,
        private configService : ConfigService
    ) {}

    @Post("/signUp")
    signUp(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<void> {
        return this.authService.signUp(authCredentialDto)
    }

    @Post("/login")
    signIn(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<{ accessToken : string }> {
        return this.authService.signIn(authCredentialDto)
    }

    // 왜 테이블안에 0번째 데이터로만 나오쥐
    @Post("/test")
    @UseGuards(AuthGuard())
    test(@Req() req) {
        return req.user
    }

    // 왜 테이블안에 0번째 데이터로만 나오쥐
    @Post("/test2")
    @UseGuards(AuthGuard())
    test2(@GetUser() user : User) {
        return user
    }

    @Get("/envTest")
    env() : string {
        return this.configService.get<string>("JWT_SECRET_KEY")
    }



}
