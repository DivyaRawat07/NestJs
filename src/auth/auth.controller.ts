import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
constructor(
    private authService: AuthService,
){}
@Post('/signup')
signUp(@Body(ValidationPipe)AuthCredentialsDto: AuthCredentialDto): Promise<void>{
   return this.authService.signUp(AuthCredentialsDto);
   
}
@Post('/signin')
signIn(@Body(ValidationPipe)AuthCredentialsDto: AuthCredentialDto): Promise<{accessToken: string}>{
   return this.authService.signIn(AuthCredentialsDto);
}
@Post('/test')
@UseGuards(AuthGuard())
test(@GetUser() user: User){
    console.log(user)

}
}