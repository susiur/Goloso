import { AuthService } from './auth-service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AppUser } from './entities/user-entity';
import { LoginAuthDto } from './dto/login-dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginAuthDto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
    register(createAuthDto: CreateAuthDto): Promise<{
        username: string;
    }>;
    dataAdmin(user: AppUser): AppUser;
    infoAdmin(user: AppUser): AppUser;
}
