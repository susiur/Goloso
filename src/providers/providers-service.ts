// src/providers/providers.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider-entity';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider-dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const provider = this.providersRepository.create(createProviderDto);
    return await this.providersRepository.save(provider);
  }

  async findAll(): Promise<Provider[]> {
    return await this.providersRepository.find();
  }

  async findOne(id: number): Promise<Provider> {
    return await this.providersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProviderDto: UpdateProviderDto): Promise<Provider> {
    await this.providersRepository.update(id, updateProviderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.providersRepository.delete(id);
  }
}
