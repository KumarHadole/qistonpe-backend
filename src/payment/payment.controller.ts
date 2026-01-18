import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() body: CreatePaymentDto) {
    return this.paymentService.create(body);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
}
