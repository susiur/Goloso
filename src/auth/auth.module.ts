import { Module } from '@nestjs/common';
import { AuthService } from './auth-service';
import { JwtStrategy } from './strategy/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUser } from './entities/user-entity';
import { AuthController } from './auth-controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AppUser]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [],
            inject: [],
            useFactory: () => ({
                secret: 'holaholahola',
                signOptions: { expiresIn: '90d' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, JwtModule, TypeOrmModule, JwtStrategy],
})
export class AuthModule {}