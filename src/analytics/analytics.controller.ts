import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // 🔹 Outstanding by vendor
  @Get('vendor-outstanding')
  vendorOutstanding() {
    return this.analyticsService.vendorOutstanding();
  }

  // 🔹 Payment aging report
  @Get('payment-aging')
  paymentAging() {
    return this.analyticsService.paymentAging();
  }
}
