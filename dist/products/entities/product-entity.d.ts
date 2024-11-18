import { Provider } from '../../providers/entities/provider-entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    providerId: number;
    provider: Provider;
}
