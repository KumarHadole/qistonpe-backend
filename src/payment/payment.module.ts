import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PurchaseOrder } from '../purchase-order/purchase-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PurchaseOrder])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
