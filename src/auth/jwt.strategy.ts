import { is } from "@babel/types";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "jsonwebtoken";
import { Strategy,ExtractJwt } from 'passport-jwt'
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,

    ){
       
    super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret29' 
        });
    }
    async validate (payload:JwtPayload): Promise<User>{
        const { username} = payload;
        console.log(payload)
        const user = await this.userRepository.findOne({username});
        console.log(user)

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }
}