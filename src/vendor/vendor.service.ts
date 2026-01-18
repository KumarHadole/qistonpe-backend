import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  // ✅ STEP-5.5 UPDATED METHOD
  async create(data: CreateVendorDto) {
    // 🔍 Check duplicate by email OR name
    const existingVendor = await this.vendorRepo.findOne({
      where: [
        { email: data.email },
        { name: data.name },
      ],
    });

    // ❌ If duplicate found → throw error
    if (existingVendor) {
      throw new ConflictException('Vendor with same name or email already exists');
    }

    // ✅ Save if no duplicate
    return this.vendorRepo.save(data);
  }

  findAll() {
    return this.vendorRepo.find();
  }

  findOne(id: number) {
    return this.vendorRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<Vendor>) {
    return this.vendorRepo.update(id, data);
  }
}
