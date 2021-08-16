import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

// @Post('/signUp')
//  signUp(@Body() authCredentialDto: AuthCredentialDto){
//     console.log(authCredentialDto)
// }
constructor(
    private authService: AuthService,
){}
@Post('/signup')
signUp(@Body()AuthCredentialsDto: AuthCredentialDto): Promise<void>{
   return this.authService.signUp(AuthCredentialsDto);
   //console.log(AuthCredentialsDto);
}
}