import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients-service';
import { ClientsController } from './clients-controller';
import { Client } from './entities/client-entity';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Client]),
        PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [ClientsController],
    providers: [ClientsService],
})
export class ClientsModule {}