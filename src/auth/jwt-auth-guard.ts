import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = ['admin'];
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log(user.role);
    for (const rol of user.role) {
        if (validRoles.includes(rol)) return true;
    }
    throw new UnauthorizedException('Forbiden for your rol');
    }
}

export class ProviderGuard implements CanActivate {
    canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = ['provider'];
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log(user.role);
    for (const rol of user.role) {
        if (validRoles.includes(rol)) return true;
    }
    throw new UnauthorizedException('Forbiden for your rol');
    }
}