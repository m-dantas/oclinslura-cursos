import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private product: ProductEntity[] = [];

  save(data: ProductEntity) {
    this.product.push(data);
    return data;
  }

  async update(id: string, data: Partial<ProductEntity>) {
    const notAllowUpdate = ['id', 'userId'];
    const product = this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (notAllowUpdate.includes(key)) {
        return;
      }
      product[key] = value;
    });

    return product;
  }

  async delete(id: string) {
    const product = this.findById(id);
    this.product = this.product.filter((product) => product.id !== id);
    return product;
  }

  findMany() {
    return this.product;
  }
  
  private findById(id: string) {
    const product = this.product.find((product) => product.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}
