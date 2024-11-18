import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersService } from './providers-service';
import { ProvidersController } from './providers-controller';
import { Provider } from './entities/provider-entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
