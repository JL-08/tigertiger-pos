import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO) {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO) {
    return await this.authService.register(createUserDto);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test() {
    return 'Token is valid';
  }
}
