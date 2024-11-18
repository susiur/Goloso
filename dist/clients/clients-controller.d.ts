import { ClientsService } from './clients-service';
import { CreateClientDto, UpdateClientDto } from './dto/client-dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<import("./entities/client-entity").Client>;
    findAll(): Promise<import("./entities/client-entity").Client[]>;
    findOne(id: string): Promise<import("./entities/client-entity").Client>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("./entities/client-entity").Client>;
    remove(id: string): Promise<void>;
}
