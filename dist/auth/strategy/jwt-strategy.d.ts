import { AppUser } from '../entities/user-entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/jwt-payload';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: Repository<AppUser>);
    validate(payload: JwtPayload): Promise<AppUser>;
}
export {};
