import { Order } from '../models/order/order_model.js';
import userModel from '../models/userModel.js';
import { createOrder, updateOrder, getOrders } from '../services/order_service.js';

export const createTheOrder = async (req, res, next) => {
    try {
        const model = {
            userId: req.params.userId,
            card_Name: req.body.card_Name,
            card_Number: req.body.card_Number,
            card_ExpMonth: req.body.card_ExpMonth,
            card_ExpYear: req.body.card_ExpYear,
            card_CVC: req.body.card_CVC,
            amount: req.body.amount
        };

        const results = await createOrder(model);

        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    } catch (error) {
        return next(error);
    }
};




export const updateTheOrder = (req, res, next) => {
    updateOrder(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    });
};

export const findAll = (req, res, next) => {
    getOrders(req.params.userId, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    });
};


export const saveOrder = async (req, res) => {
    const { userId } = req.params;
    const { products, grandTotal, orderStatus, transactionId, orderEvent } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderModel = new Order({
            userId: userId,
            products: products,
            orderStatus: 'pending',
            grandTotal: grandTotal,
            orderEvent: orderEvent,
        });
        const response = await orderModel.save();
        console.log(response);
        return res.status(200).json('success');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

};

export const getUserOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        const userOrders = await Order.find({ userId }).populate({
            path: 'products.product',
            populate : {path: 'category', select: 'name' },
        });

        if (!userOrders || userOrders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(userOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};