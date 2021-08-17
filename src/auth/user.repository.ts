import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void>{

        const { username, password} = authCredentialDto;
        const salt = await bcrypt.genSalt()
        
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password,salt);
        console.log(password, salt)
        try{

            await user.save()
        }catch(error){
        if(error.code ==='23505'){
            throw new ConflictException('Username Already Exists')
        }else{
            throw new InternalServerErrorException()
        }
        }
    }

    async validateUserPassword(authCredentialDto: AuthCredentialDto){
        const { username, password} = authCredentialDto;
        const user = await this.findOne({username})
        console.log('user',user)

        if(user){
        return user.username
        }else{
            return null;
        }

    }

    private async hashPassword(password: string, salt: string):Promise<string>{
        return bcrypt.hash(password, salt)




        
    }
}













































































        
    

