// src/providers/dto/provider.dto.ts

export class CreateProviderDto {
  name: string;
  contactInfo: string;
}

export class UpdateProviderDto {
  name?: string;
  contactInfo?: string;
}
