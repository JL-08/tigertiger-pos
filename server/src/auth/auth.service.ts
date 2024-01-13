import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoggerService } from 'src/logger/logger.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { UserLogin } from 'src/users/interfaces/user-login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private userservice: UsersService,
  ) {}

  async login(loginUserDto: LoginUserDTO): Promise<UserLogin> {
    var existingUser = await this.userservice.findOne(loginUserDto.username);

    if (!existingUser) throw new NotFoundException('User does not exist');
    const isValid = compareSync(loginUserDto.password, existingUser.password);

    if (isValid) {
      var accessToken = this.jwtService.sign({ username: existingUser.username });
      var userLogin: UserLogin = { username: existingUser.username, role: existingUser.role, token: accessToken };

      return userLogin;
    }

    throw new UnauthorizedException('Invalid Credentials');
  }

  async register(createUserDto: CreateUserDTO): Promise<User> {
    createUserDto.password = hashSync(createUserDto.password, 10);

    try {
      return await this.userservice.create(createUserDto);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`User "${createUserDto.username}" already exists`);
      }
      throw err;
    }
  }
}
