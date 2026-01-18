import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './payment.entity';
import { PurchaseOrder } from '../purchase-order/purchase-order.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    @InjectRepository(PurchaseOrder)
    private poRepo: Repository<PurchaseOrder>,

    private dataSource: DataSource,
  ) {}

  async create(dto: CreatePaymentDto) {
    // 🔁 Transaction (CRITICAL)
    return this.dataSource.transaction(async (manager) => {
      const po = await manager.findOne(PurchaseOrder, {
        where: { id: dto.purchaseOrderId },
      });

      if (!po) {
        throw new BadRequestException('Purchase order not found');
      }

      // 🔢 Total payments already done
      const payments = await manager.find(Payment, {
        where: { purchaseOrder: { id: po.id } },
      });

      const totalPaid = payments.reduce(
        (sum, p) => sum + p.amount,
        0,
      );

      const outstanding = po.totalAmount - totalPaid;

      // ❌ Overpayment check
      if (dto.amount <= 0 || dto.amount > outstanding) {
        throw new BadRequestException(
          'Invalid payment amount',
        );
      }

      // 🔢 Generate payment reference
      const count = await manager.count(Payment);
      const ref = `PAY-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')}-${count + 1}`;

      const payment = manager.create(Payment, {
        referenceNumber: ref,
        purchaseOrder: po,
        amount: dto.amount,
        paymentDate: new Date(dto.paymentDate),
        method: dto.method,
      });

      await manager.save(payment);

      // 🔁 Update PO status
      const newTotalPaid = totalPaid + dto.amount;

      if (newTotalPaid === po.totalAmount) {
        po.status = 'Fully Paid';
      } else {
        po.status = 'Partially Paid';
      }

      await manager.save(po);

      return payment;
    });
  }

  findAll() {
    return this.paymentRepo.find({
      relations: ['purchaseOrder'],
    });
  }
}
