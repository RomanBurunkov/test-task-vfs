import { Get, Controller, Dependencies } from '@nestjs/common';
import { VfsService } from './vfs.service';
import { genOk } from 'tm-result';

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
}
