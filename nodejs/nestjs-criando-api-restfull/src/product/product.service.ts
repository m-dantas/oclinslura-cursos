import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { UpdateProductDTO } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ){}

  async getAllProducts() {
    return await this.productRepository.find()
  }

  async createProduct(product: ProductEntity) {
    await this.productRepository.save(product)
  }

  async updateProduct(id: string, product: UpdateProductDTO) {
    await this.productRepository.update(id, product)
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id)
  }
}
