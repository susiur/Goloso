import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AppUser } from './entities/user-entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<AppUser>, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(loginUser: LoginAuthDto): Promise<{
        access_token: string;
    }>;
    getJwtToken(arg0: {
        email: any;
        username: string;
    }): void;
    register(createauthDto: CreateAuthDto): Promise<{
        username: string;
    }>;
}
