import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductFeatureEntity } from "./product-feature.entity";
import { ProductImageEntity } from "./product-image.entity";

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, nullable: false })
  userId: string;

  @Column({ length: 100, nullable: false })
  name: string;
  
  @Column({type: 'numeric', precision: 10, scale: 2, nullable: false })
  value: number;
  
  @Column({ nullable: false })
  amount: number;

  @Column({ length: 255, nullable: false })
  description: string;
  
  @Column({ length: 100, nullable: false })
  category: string;
  
  @OneToMany(
    () => ProductFeatureEntity,
    productFeatureEntity => productFeatureEntity.product,
    { cascade: true, eager: true }
  )
  features: ProductFeatureEntity[];
  
  @OneToMany(
    () => ProductImageEntity,
    productImageEntity => productImageEntity.product,
    { cascade: true, eager: true }
  )
  images: ProductImageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string
  
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string
}