import { Get, Controller, Dependencies } from '@nestjs/common';
import { genOk } from 'tm-result';
import { VfsService } from './vfs.service';

@Controller('vfs')
@Dependencies(VfsService)
export class VfsController {
  constructor(vfsService) {
    this.vfsService = vfsService;
  }

  @Get('version')
  getVersion() {
    return genOk(this.vfsService.getVersion());
  }

  @Get('properties/types')
  async getPropertiesTypes() {
    return genOk(await this.vfsService.getPropertiesTypes());
  }

  @Get('items/types')
  async getItemTypes() {
    return genOk(await this.vfsService.getItemTypes());
  }
}
