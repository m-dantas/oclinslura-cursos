import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'product_features' })
export class ProductFeatureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 100, nullable: false })
  description: string;

  @ManyToOne(
    () => ProductEntity,
    (product) => product.features,
    { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  product: ProductEntity
}