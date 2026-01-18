import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-po.dto';

@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly poService: PurchaseOrderService) {}

  @Post()
  create(@Body() body: CreatePurchaseOrderDto) {
    return this.poService.create(body);
  }

  @Get()
  findAll() {
    return this.poService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.poService.findOne(+id);
  }
}
