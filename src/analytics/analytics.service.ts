import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../vendor/vendor.entity';
import { PurchaseOrder } from '../purchase-order/purchase-order.entity';
import { Payment } from '../payment/payment.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,

    @InjectRepository(PurchaseOrder)
    private poRepo: Repository<PurchaseOrder>,

    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  // ✅ 1️⃣ Outstanding balance by vendor
  async vendorOutstanding() {
    const vendors = await this.vendorRepo.find();

    const result: {
  vendorId: number;
  vendorName: string;
  outstandingAmount: number;
}[] = [];


    for (const vendor of vendors) {
      const pos = await this.poRepo.find({
        where: { vendor: { id: vendor.id } },
      });

      let outstanding = 0;

      for (const po of pos) {
        const payments = await this.paymentRepo.find({
          where: { purchaseOrder: { id: po.id } },
        });

        const paid = payments.reduce(
          (sum, p) => sum + p.amount,
          0,
        );

        outstanding += po.totalAmount - paid;
      }

      result.push({
        vendorId: vendor.id,
        vendorName: vendor.name,
        outstandingAmount: outstanding,
      });
    }

    return result;
  }

  // ✅ 2️⃣ Payment aging report
  async paymentAging() {
    const pos = await this.poRepo.find();

    const aging = {
      '0-30 days': 0,
      '31-60 days': 0,
      '61-90 days': 0,
      '90+ days': 0,
    };

    const today = new Date();

    for (const po of pos) {
      const payments = await this.paymentRepo.find({
        where: { purchaseOrder: { id: po.id } },
      });

      const paid = payments.reduce(
        (sum, p) => sum + p.amount,
        0,
      );

      const outstanding = po.totalAmount - paid;

      if (outstanding <= 0) continue;

      const diffDays = Math.floor(
        (today.getTime() - po.dueDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (diffDays <= 30) aging['0-30 days'] += outstanding;
      else if (diffDays <= 60)
        aging['31-60 days'] += outstanding;
      else if (diffDays <= 90)
        aging['61-90 days'] += outstanding;
      else aging['90+ days'] += outstanding;
    }

    return aging;
  }
}
