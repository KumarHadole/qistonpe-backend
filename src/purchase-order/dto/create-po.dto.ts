import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsNumber()
  vendorId: number;

  @IsDateString()
  poDate: string;

  @IsNumber()
  totalAmount: number;
}
 