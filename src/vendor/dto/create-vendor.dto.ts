import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  paymentTerms: number;

  @IsEnum(['Active', 'Inactive'])
  status: string;
}
