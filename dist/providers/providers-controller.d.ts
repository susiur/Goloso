import { ProvidersService } from './providers-service';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider-dto';
export declare class ProvidersController {
    private readonly providersService;
    constructor(providersService: ProvidersService);
    create(createProviderDto: CreateProviderDto): Promise<import("./entities/provider-entity").Provider>;
    findAll(): Promise<import("./entities/provider-entity").Provider[]>;
    findOne(id: string): Promise<import("./entities/provider-entity").Provider>;
    update(id: string, updateProviderDto: UpdateProviderDto): Promise<import("./entities/provider-entity").Provider>;
    remove(id: string): Promise<void>;
}
