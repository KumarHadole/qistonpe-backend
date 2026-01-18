import { IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  purchaseOrderId: number;

  @IsNumber()
  amount: number;

  @IsDateString()
  paymentDate: string;

  @IsEnum(['Cash', 'Cheque', 'NEFT', 'RTGS', 'UPI'])
  method: string;
}
