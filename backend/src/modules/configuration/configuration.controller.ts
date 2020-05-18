import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { resources } from 'src/util/resources';
import { ConfigurationService } from '@services/configuration.service';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.CONFIGURATIONS)
export class ConfigurationController {

  constructor(
    private configurationService: ConfigurationService
  ) { }

  @Get('stripe/public-key')
  async getStripePublicKey(): Promise<{ stripePublicKey: string }> {
    return await this.configurationService.getStripePublicKey();
  }

}
