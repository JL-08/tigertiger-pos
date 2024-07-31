/* eslint-disable @typescript-eslint/dot-notation */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { AccessTokenGuard } from './strategy/accessToken.guard';
import { RefreshTokenGuard } from './strategy/refreshToken.guard';
import { Request as RequestUser } from 'express';

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

  @Get('logout')
  logout(@Req() req: RequestUser) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: RequestUser) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  getUser(@Req() req: RequestUser) {
    return {
      username: req.user['username'],
      role: req.user['role'],
    };
  }

  @Get('test')
  @UseGuards(AccessTokenGuard)
  test() {
    return 'Token is valid';
  }
}
