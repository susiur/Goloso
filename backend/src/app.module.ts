import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './providers/entities/provider-entity';
import { Product } from './products/entities/product-entity';
import { AppUser } from './auth/entities/user-entity';
import { Client } from './clients/entities/client-entity';


@Module({
  imports: [AuthModule, ProductsModule, ProvidersModule, ClientsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'goloso',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Provider, Product, AppUser, Client],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
