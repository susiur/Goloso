import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Product } from 'src/products/entities/product-entity';
import { ProductsController } from 'src/products/products-controller';
import { ProductsService } from 'src/products/products-service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
