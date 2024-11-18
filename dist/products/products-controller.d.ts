import { ProductsService } from './products-service';
import { CreateProductDto, UpdateProductDto } from './dto/product-dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("./entities/product-entity").Product>;
    findAll(): Promise<import("./entities/product-entity").Product[]>;
    findOne(id: string): Promise<import("./entities/product-entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product-entity").Product>;
    remove(id: string): Promise<void>;
}
