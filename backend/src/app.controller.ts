import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('crash-test')
  crashTest() {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
    return 'Сервер сейчас упадёт';
  }
}
