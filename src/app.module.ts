import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PaymentModule } from './payment/payment.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',     // change if different
      password: 'Kunal@2005',     // change if different
      database: 'qistonpe',     // this DB must exist
      autoLoadEntities: true,
      synchronize: true,
    }),
    VendorModule,
    PurchaseOrderModule,
    PaymentModule,
    AnalyticsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
