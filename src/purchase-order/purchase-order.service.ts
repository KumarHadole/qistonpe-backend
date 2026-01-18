import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { Vendor } from '../vendor/vendor.entity';
import { CreatePurchaseOrderDto } from './dto/create-po.dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private poRepo: Repository<PurchaseOrder>,

    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async create(dto: CreatePurchaseOrderDto) {
    const vendor = await this.vendorRepo.findOneBy({ id: dto.vendorId });

    if (!vendor) {
      throw new BadRequestException('Vendor not found');
    }

    if (vendor.status === 'Inactive') {
      throw new BadRequestException('Cannot create PO for inactive vendor');
    }

    const poDate = new Date(dto.poDate);
    const dueDate = new Date(poDate);
    dueDate.setDate(dueDate.getDate() + vendor.paymentTerms);

    const poCount = await this.poRepo.count();
    const poNumber = `PO-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${poCount + 1}`;

    const po = this.poRepo.create({
      poNumber,
      vendor,
      poDate,
      dueDate,
      totalAmount: dto.totalAmount,
      status: 'Approved',
    });

    return this.poRepo.save(po);
  }

  findAll() {
    return this.poRepo.find({ relations: ['vendor'] });
  }

  findOne(id: number) {
    return this.poRepo.findOne({
      where: { id },
      relations: ['vendor'],
    });
  }
}
