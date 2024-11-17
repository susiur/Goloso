export class CreateClientDto {
  name: string;
  email: string;
  contactInfo: string;
  relocationInfo?: string;
}

export class UpdateClientDto {
  name?: string;
  email?: string;
  contactInfo?: string;
  relocationInfo?: string;
}
