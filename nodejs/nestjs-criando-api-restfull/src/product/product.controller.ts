import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Controller('products')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() data: CreateProductDTO) {
    const productEntity = new ProductEntity();

    productEntity.id = randomUUID();
    productEntity.name = data.name;
    productEntity.userId = data.userId;
    productEntity.value = data.value;
    productEntity.amount = data.amount;
    productEntity.description = data.description;
    productEntity.category = data.category;
    productEntity.features = data.features;
    productEntity.images = data.images;

    const product = this.productRepository.save(productEntity);
    return {
      product,
      message: 'Product was created'
    };
  }

  @Get()
  async listProduct() {
    return this.productRepository.findMany();
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDTO,
  ) {
    const product = await this.productRepository.update(
      id,
      data,
    );

    return {
      product,
      message: 'Product was updated'
    };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productRepository.delete(id);

    return {
      product,
      message: 'Product was deleted'
    };
  }
}
