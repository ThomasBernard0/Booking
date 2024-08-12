import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BookingService } from 'src/booking/services/booking.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @Inject(forwardRef(() => BookingService))
    private bookingService: BookingService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2024-06-20',
    });
  }

  verifySignature(payload: any): Stripe.Event {
    const payloadString = JSON.stringify(payload, null, 2);
    const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
    const header = this.stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });
    try {
      return this.stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
      throw new Error(
        `Webhook signature verification failed: ${error.message}`,
      );
    }
  }

  public async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        const compledtedSessionId: string = event.data.object.id;
        await this.bookingService.makeABooking(compledtedSessionId);
        break;
      case 'checkout.session.expired':
        const expiredSessionId: string = event.data.object.id;
        await this.bookingService.cancelABooking(expiredSessionId);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  async createCheckoutSession(
    unitPriceInCent: number,
    quantity: number,
    successUrl: string,
    cancelUrl: string,
  ) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Booking slot',
            },
            unit_amount: unitPriceInCent,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    return session.id;
  }
}
