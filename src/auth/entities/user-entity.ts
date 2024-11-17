import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MinLength } from 'class-validator';

@Entity()
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length:20, nullable: false, unique: true })
  username: string;

  @Column('varchar', {length:255, nullable: false })
  password: string;

  @Column('text', { 
    array: true, 
    nullable: false,
    default: ['user']
  })
  @MinLength(1)
  role: string[]; 
}
