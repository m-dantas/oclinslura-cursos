import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductImageEntity } from './product-image.entity';
import { ProductFeatureEntity } from './product-feature.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService
  ) {}

  @Post()
  async createProduct(@Body() data: CreateProductDTO) {
    const productEntity = new ProductEntity();

    productEntity.name = data.name;
    productEntity.userId = data.userId;
    productEntity.value = data.value;
    productEntity.amount = data.amount;
    productEntity.description = data.description;
    productEntity.category = data.category;
    productEntity.features = data.features.map(featureDto => {
      const feature = new ProductFeatureEntity();
      feature.name = featureDto.name;
      feature.description = featureDto.description;

      return feature;
    });

    productEntity.images = data.images.map(imgDto => {
      const image = new ProductImageEntity();
      image.url = imgDto.url;
      image.description = imgDto.description;

      return image;
    });

    await this.productService.createProduct(productEntity);

    return {
      message: 'Product was created'
    };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getAllProducts()
    return {
      products,
      message: null
    }
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDTO,
  ) {
    await this.productService.updateProduct(id, data);

    return {
      message: 'Product was updated'
    };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);

    return {
      message: 'Product was deleted'
    };
  }
}
