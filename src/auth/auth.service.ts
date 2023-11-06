import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialDto} from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";
import {User} from "./user.entity";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService : JwtService
    ) {}

    async signUp(credentialDto : AuthCredentialDto) : Promise<void> {
        return this.userRepository.createUser(credentialDto)
    }

    async signIn(credentialDto : AuthCredentialDto) : Promise<{ accessToken : string }> {
        const {username, password} = credentialDto
        const user : User = await this.userRepository.findOne({
            where : {
                username : username
            }
        })

        if(user && (await bcrypt.compare(password, user.password))) {
            
            // user jwt token 생성 ( secret + payload 필요)
            const payload = {name: username}
            const accessToken = await this.jwtService.sign(payload)

            console.log(`login token 생성 성공 ${user.username} ${accessToken} \n`, user)

            // return `${username} login success`
            return {accessToken}
        }else{
            throw new UnauthorizedException(`login failed`)
        }
    }

}
