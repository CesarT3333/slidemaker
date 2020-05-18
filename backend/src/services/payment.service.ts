import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

import { SubscriptionStatusEnum } from '@model/enum/subscription-status.enum';
import { BillingPlanEnum } from '@model/enum/billing-plan.enum';
import { SubscriptionService } from './subscription.service';
import { Subscription } from '@model/subscription';
import { UserService } from './user.service';
import { PlanService } from './plan.service';
import User from '@model/user';
import Plan from '@model/plan';

@Injectable()
export class PaymentService {

  constructor(
    @InjectStripe() private stripeClient: Stripe,
    private subscriptionService: SubscriptionService,
    private configService: ConfigService,
    private planService: PlanService,
    private userService: UserService,
  ) { }

  async confirmPayment(sessionId: string, user: User): Promise<any> {
    const apiKey: string = this.configService.get('STRIPE_SECRET_KEY');

    const stripeSessionResponse: Stripe.Checkout.Session = await this.stripeClient
      .checkout.sessions.retrieve(sessionId, {}, { apiKey });

    const subscriptionOfLoggedUser: Subscription = await this.subscriptionService
      .getForLoggedInUser(user);

    subscriptionOfLoggedUser.status = await this.updateStatusUserSubscription(subscriptionOfLoggedUser, stripeSessionResponse);

    if (subscriptionOfLoggedUser.status === SubscriptionStatusEnum.APPROVED) {

      if (subscriptionOfLoggedUser.user.email === stripeSessionResponse.customer_email) {
        await this.subscriptionService.updateWithStatus(subscriptionOfLoggedUser);
      } else {
        throw new BadRequestException('user email does not match email used for payment');
      }
    } else {
      throw new BadRequestException('Payment rejected');
    }

  }

  async createStripeSession(subscription: Subscription) {

    const userEmail: string = await this.userService
      .getEmailByGoogleId(subscription.user.googleId);

    await this.createSubscriptionIfNotExist(subscription);

    const selectedPlan: Plan = await this.planService.getById(subscription.plan.id);
    const productRequest = this.buildProductRequest(selectedPlan, subscription);

    const urlFrontEnd: string = this.configService.get('URL_FRONTEND');
    const apiKey: string = this.configService.get('STRIPE_SECRET_KEY');

    return await this.stripeClient.checkout.sessions.create(
      {
        customer_email: userEmail,
        success_url: `${urlFrontEnd}/payment/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${urlFrontEnd}/plans`,
        payment_method_types: ['card'],
        ...productRequest
      }, { apiKey }
    );
  }

  private async createSubscriptionIfNotExist(subscription: Subscription): Promise<void> {
    const userSubscription: Subscription =
      await this.subscriptionService.getForLoggedInUser(subscription.user);

    if (userSubscription) {
      subscription = <Subscription>{
        id: userSubscription.id,
        user: userSubscription.user,
        plan: subscription.plan,
        amountPresentation: subscription.amountPresentation
      };
    }

    await this.subscriptionService.create(subscription);

  }

  private async updateStatusUserSubscription(
    subscriptionOfLoggedUser: Subscription,
    sessionResponse: Stripe.Checkout.Session
  ): Promise<SubscriptionStatusEnum> {

    const apiKey: string = this.configService.get('STRIPE_SECRET_KEY');

    if (subscriptionOfLoggedUser.plan.billingType === BillingPlanEnum.MONTH) {

      const stripeSubscription = await this.stripeClient.subscriptions
        .retrieve(`${sessionResponse.subscription}`, {}, { apiKey });

      return stripeSubscription.status === 'active' ?
        SubscriptionStatusEnum.APPROVED :
        SubscriptionStatusEnum.REPPROVED;

    } else {

      const paymentIntent = await this.stripeClient.paymentIntents
        .retrieve(`${sessionResponse.payment_intent}`, {}, { apiKey });

      return paymentIntent.status === 'succeeded' ?
        SubscriptionStatusEnum.APPROVED :
        SubscriptionStatusEnum.REPPROVED;
    }
  }

  private buildProductRequest(selectedPlan: Plan, subscription: Subscription): {
    subscription_data?: any,
    line_items?: Array<any>
  } {

    // TODO: Extract to factory
    if (selectedPlan.billingType === BillingPlanEnum.PRESENTATION) {
      return {
        line_items: [
          {
            name: selectedPlan.name,
            description: selectedPlan.description,
            amount: selectedPlan.cost * 100,
            currency: 'brl',
            quantity: subscription.amountPresentation,
          }
        ]
      };
    } else {
      const planId: string =
        this.configService.get('STRIPE_PLAN_ENTERPRISE_ID');
      return {
        subscription_data: {
          items: [
            {
              plan: planId,
              quantity: 1
            }
          ]
        }
      };
    }
  }

}
