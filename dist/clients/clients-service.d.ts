import { Repository } from 'typeorm';
import { Client } from './entities/client-entity';
import { CreateClientDto, UpdateClientDto } from './dto/client-dto';
export declare class ClientsService {
    private clientsRepository;
    constructor(clientsRepository: Repository<Client>);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<Client>;
    remove(id: number): Promise<void>;
}
