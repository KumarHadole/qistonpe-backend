import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { PurchaseOrder } from '../purchase-order/purchase-order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  referenceNumber: string;

  @ManyToOne(() => PurchaseOrder)
  purchaseOrder: PurchaseOrder;

  @Column()
  amount: number;

  @Column()
  paymentDate: Date;

  @Column()
  method: string;

  @CreateDateColumn()
  createdAt: Date;
}
