// import { Type } from 'class-transformer'; - Não vai usar, pode remover ou manter comentado
import {
  // ArrayMinSize, - Não vai usar, pode remover ou manter comentado
  // IsArray, - Não vai usar, pode remover ou manter comentado
  // ValidateNested, - Não vai usar, pode remover ou manter comentado
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
// import { ProductFeatureDTO, ProductImageDTO } from './create-product.dto'; - Não vai usar, pode remover ou manter comentado

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
  amount: number;

  @IsString()
  @IsOptional()
  description: string;

  // - Não vai usar, pode remover ou manter comentado
  // @ValidateNested()
  // @IsArray()
  // @ArrayMinSize(3)
  // @Type(() => ProductFeatureDTO)
  // @IsOptional()
  // features: ProductFeatureDTO[];

  // - Não vai usar, pode remover ou manter comentado
  // @ValidateNested()
  // @IsArray()
  // @ArrayMinSize(1)
  // @Type(() => ProductImageDTO)
  // @IsOptional()
  // images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;
}
