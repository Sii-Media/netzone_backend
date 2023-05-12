import userModel from "../models/userModel";
import { Card } from '../models/card/card.model.js';
import { addCard, createCustomer, generatePaymentIntent } from "./stripe_service.js";
import { Order } from "../models/order/order_model";


const createOrder = async (params, callback) => {
    await userModel.findOne({ _id: params.userId }, async (err, userDB) => {
        if (err) {
            return callback(err);
        }
        else {

            var model = {};
            if (!userDB.stripeCustomerID) {
                await createCustomer({
                    "name": userDB.username,
                    "email": userDB.email,
                }, (error, results) => {
                    if (error) {
                        return callback(error);
                    }
                    if (results) {
                        userDB.stripeCustomerID = results.id;
                        userDB.save();

                        model.stripeCustomerID = results.id;
                    }
                })
            }
            else {
                model.stripeCustomerID = userDB.stripeCustomerID;
            }

            await Card.findOne({
                customerId: model.stripeCustomerID,
                cardNumber: params.card_Number,
                cardExpMonth: params.card_ExpMonth,
                cardExpYear: params.card_ExpYear,
            }, async (error, cardDB) => {
                if (error) {
                    return callback(error);
                }
                else {
                    if (!cardDB) {
                        await addCard({
                            "card_Name": params.card_Name,
                            "card_Number": params.card_Number,
                            "card_ExpMonth": params.card_ExpMonth,
                            "card_ExpYear": params.card_ExpYear,
                            "card_CVC": params.card_CVC,
                            "customer_id": model.stripeCustomerID,
                        }, (error, results) => {
                            if (error) {
                                return callback(error);
                            }
                            if (results) {
                                const cardModel = new Card({
                                    cardId: results.card,
                                    cardName: params.card_Name,
                                    cardNumber: params.card_Number,
                                    cardExpMonth: params.card_ExpMonth,
                                    cardExpYear: params.card_ExpYear,
                                    cardCVC: params.card_CVC,
                                    customerId: model.stripeCustomerID,

                                });
                                cardModel.save();
                                model.cardId = results.card;
                            }
                        });
                    }
                    else {
                        model.cardId = cardDB.cardId;
                    }

                    await generatePaymentIntent({
                        "receipt_email": userDB.email,
                        "amount": params.amount,
                        "card_id": model.cardId,
                        "customer_id": model.stripeCustomerID,
                    }, async (error, results) => {
                        if (error) {
                            return callback(error);
                        }

                        if (results) {
                            model.paymentIntentId = results.id;
                            model.client_secret = results.client_secret;
                        }
                    });

                    // var products = [];
                    // var grantotal = 0;

                    // const orderModel = new Order({
                    //     userId: 
                    // });

                }
            });
        }
    })
};