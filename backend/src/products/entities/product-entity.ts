import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Provider } from '../../providers/entities/provider-entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  providerId: number;

  @ManyToOne(() => Provider, (provider) => provider.products)
  @JoinColumn({ name: 'providerId' }) // Ajusta el JoinColumn para usar 'providerId'
  provider: Provider;
}
