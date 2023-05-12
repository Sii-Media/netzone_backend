import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);


export const createCustomer = async (params, callback) => {
    try {
        const customer = await stripe.customers.create({
            name: params.name,
            email: params.email
        });
        callback(null, customer);
    } catch (error) {
        return callback(error);
    }
}

export const addCard = async (params, callback) => {

    try {
        const card_token = await stripe.tokens.create({
            name: params.card_Name,
            number: params.card_Number,
            exp_month: params.card_ExpMonth,
            exp_year: params.card_ExpYear,
            cvc: params.card_CVC,
        });
        const card = await stripe.customers.createSourse(params.customer_Id, {
            source: `${card_token.id}`
        });

        callback(null, { card: card.id })

    } catch (error) {
        return callback(error);
    }
}

export const generatePaymentIntent = async (params, callback) => {
    try {
        const createPaymentIntent = await stripe.paymentIntents.create({
            receipt_email: params.receipt_email,
            amount: params.amount,
            currency: process.env.CURRENCY,
            payment_method: params.card_id,
            customer: params.customer_id,
            payment_method_types: ['card']
        });
        callback(null, createPaymentIntent);
    } catch (error) {
        return callback(error);
    }
}