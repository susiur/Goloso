import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUser } from './entities/user-entity';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AppUser)
    private usersRepository: Repository<AppUser>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUser: LoginAuthDto) {
    const user = await this.validateUser(loginUser.username, loginUser.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  getJwtToken(arg0: { email: any; username: string; }) {
    throw new Error('Method not implemented.');
  }

  async register(createauthDto: CreateAuthDto) {
    try {
      const user = this.usersRepository.create({ ...createauthDto, password: bcrypt.hashSync(createauthDto.password, 10) });
      await this.usersRepository.save(user);
      const { username } = user;
      return { username };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error creating user');
    }
  }
}
