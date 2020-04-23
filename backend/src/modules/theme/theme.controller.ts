import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ThemeService } from '@services/theme.service';
import { resources } from '../../util/resources';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.THEMES)
export class ThemeController {

  constructor(
    private themeService: ThemeService
  ) { }

  @Get()
  getAll(): Promise<any> {
    return this.themeService.getAll();
  }
}
