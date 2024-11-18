import { Repository } from 'typeorm';
import { Provider } from './entities/provider-entity';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider-dto';
export declare class ProvidersService {
    private readonly providersRepository;
    constructor(providersRepository: Repository<Provider>);
    create(createProviderDto: CreateProviderDto): Promise<Provider>;
    findAll(): Promise<Provider[]>;
    findOne(id: number): Promise<Provider>;
    update(id: number, updateProviderDto: UpdateProviderDto): Promise<Provider>;
    remove(id: number): Promise<void>;
}
