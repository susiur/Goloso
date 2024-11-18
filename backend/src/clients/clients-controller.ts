import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ClientsService } from './clients-service';
import { CreateClientDto, UpdateClientDto } from './dto/client-dto';
import { AdminGuard } from '../auth/jwt-auth-guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async findOne(@Param('id') id: string) {
    const client = await this.clientsService.findOne(+id);
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return client;
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const updatedClient = await this.clientsService.update(
      +id,
      updateClientDto,
    );
    if (!updatedClient) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return updatedClient;
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async remove(@Param('id') id: string) {
    const client = await this.clientsService.findOne(+id);
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    const result = await this.clientsService.remove(+id);
    return result;
  }
}
