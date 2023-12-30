import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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
    const userDTO = new LoginUserDTO(loginUserDto);

    var existingUser = await this.userservice.findOne(userDTO.username);

    if (!existingUser) throw new ConflictException('User does not exist');
    const isValid = compareSync(userDTO.password, existingUser.password);

    if (isValid) {
      var accessToken = this.jwtService.sign({ username: existingUser.username });
      var userLogin: UserLogin = { username: existingUser.username, role: existingUser.role, token: accessToken };

      return userLogin;
    }

    throw new UnauthorizedException('Invalid Credentials');
  }

  async register(createUserDto: CreateUserDTO): Promise<User> {
    const userDTO = new CreateUserDTO(createUserDto);
    var existingUser = await this.userservice.findOne(userDTO.username);

    if (existingUser) throw new ConflictException('User with this username already exists');

    userDTO.password = hashSync(userDTO.password, 10);

    return await this.userservice.create(userDTO);
  }
}
