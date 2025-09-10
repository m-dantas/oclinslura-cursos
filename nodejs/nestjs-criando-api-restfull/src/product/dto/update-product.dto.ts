import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductFeatureDTO, ProductImageDTO } from './create-product.dto';

export class UpdateProductDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @IsOptional()
  value: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  amountAvailable: number;

  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductFeatureDTO)
  @IsOptional()
  features: ProductFeatureDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;
}
