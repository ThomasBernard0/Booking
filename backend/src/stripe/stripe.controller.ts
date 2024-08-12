import { Controller, Post, Body, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('webhooks')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async handleStripeWebhook(@Body() payload: any): Promise<void> {
    try {
      const event = this.stripeService.verifySignature(payload);
      await this.stripeService.handleWebhook(event);
    } catch {
      throw new Error();
    }
  }
}
