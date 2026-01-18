import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Vendor } from '../vendor/vendor.entity';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  poNumber: string;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @Column()
  poDate: Date;

  @Column()
  dueDate: Date;

  @Column()
  totalAmount: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
