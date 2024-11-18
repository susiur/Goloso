import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth-service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AdminGuard } from './jwt-auth-guard';
import { getUser } from './decorators/roles-decorator';
import { AppUser } from './entities/user-entity';
import { LoginAuthDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Get('admin')
  @UseGuards(AuthGuard(), AdminGuard)
  dataAdmin(@getUser() user: AppUser) {
    return user;
  }

  @Get('info')
  @UseGuards(AuthGuard())
  infoAdmin(@getUser() user: AppUser) {
    return user;
  }
}
