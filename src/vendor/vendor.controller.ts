import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Vendors')
@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @ApiOperation({ summary: 'Create a new vendor' })
  @Post()
  create(@Body() body: CreateVendorDto) {
    return this.vendorService.create(body);
  }

  @ApiOperation({ summary: 'Get all vendors' })
  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @ApiOperation({ summary: 'Get vendor by ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vendorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update vendor by ID' })
  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<CreateVendorDto>) {
    return this.vendorService.update(+id, body);
  }
}

