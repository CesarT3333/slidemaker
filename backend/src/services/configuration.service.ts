import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {

  constructor(
    private configService: ConfigService
  ) { }

  async getStripePublicKey(): Promise<{ stripePublicKey: string }> {
    const stripePublicKey = await this.configService.get('STRIPE_PUBLIC_KEY');
    return { stripePublicKey };
  }

}
