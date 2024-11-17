export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  quality: string;
  providerId: number;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  quality?: string;
  providerId?: number;
}
