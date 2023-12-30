import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get('PRIVATE_KEY'),
        publicKey: configService.get('PUBLIC_KEY'),
        signOptions: { expiresIn: '3600s', algorithm: 'RS256' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
