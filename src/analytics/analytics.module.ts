import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Vendor } from '../vendor/vendor.entity';
import { PurchaseOrder } from '../purchase-order/purchase-order.entity';
import { Payment } from '../payment/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, PurchaseOrder, Payment]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
