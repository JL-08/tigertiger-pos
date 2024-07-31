import { BadRequestException, ConflictException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoggerService } from 'src/logger/logger.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { UserLogin } from 'src/users/interfaces/user-login.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(loginUserDto: LoginUserDTO): Promise<UserLogin> {
    const existingUser = await this.userService.findOne(loginUserDto.username);

    if (!existingUser) throw new BadRequestException('Invalid username or password');
    const isValid = compareSync(loginUserDto.password, existingUser.password);

    if (!isValid) throw new BadRequestException('Invalid username or password');

    const tokens = await this.getTokens(existingUser);
    await this.updateRefreshToken(existingUser.id, tokens.refreshToken);

    const userLogin: UserLogin = {
      username: existingUser.username,
      role: existingUser.role,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };

    return userLogin;
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async register(createUserDto: CreateUserDTO): Promise<User> {
    createUserDto.password = hashSync(createUserDto.password, 10);

    try {
      return await this.userService.create(createUserDto);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`User "${createUserDto.username}" already exists`);
      }
      throw err;
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = hashSync(refreshToken, 10);

    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('PUBLIC_KEY'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('PUBLIC_KEY'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);

    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = compareSync(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { username: user.username, role: user.role, ...tokens };
  }
}
