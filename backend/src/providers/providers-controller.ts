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
import { ProvidersService } from './providers-service';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider-dto';
import { AdminGuard } from '../auth/jwt-auth-guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @UseGuards(AuthGuard(), AdminGuard)
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async findOne(@Param('id') id: string) {
    const provider = await this.providersService.findOne(+id);
    if (!provider) {
      throw new NotFoundException(`Provider with id ${id} not found`);
    }
    return provider;
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    const updatedProvider = await this.providersService.update(
      +id,
      updateProviderDto,
    );
    if (!updatedProvider) {
      throw new NotFoundException(`Provider with id ${id} not found`);
    }
    return updatedProvider;
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async remove(@Param('id') id: string) {
    const provider = await this.providersService.findOne(+id);
    if (!provider) {
      throw new NotFoundException(`Provider with id ${id} not found`);
    }
    return this.providersService.remove(+id);
  }
}
