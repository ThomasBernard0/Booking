# Booking

Stripe setup en local

dans un cmd:

- stripe login
- stripe listen --forward-to localhost:3000/webhooks --events checkout.session.completed,checkout.session.expired,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed
