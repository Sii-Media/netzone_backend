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
    const { products, grandTotal, orderStatus, transactionId, orderEvent, shippingAddress, mobile, subTotal, serviceFee } = req.body;

    try {
        console.log(req.body);
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderModel = new Order({
            userId: userId,
            products: products,
            orderStatus: orderStatus,
            grandTotal: grandTotal,
            orderEvent: orderEvent,
            shippingAddress: shippingAddress,
            mobile: mobile,
            subTotal: subTotal,
            serviceFee: serviceFee,
        });
        const response = await orderModel.save();
        console.log(response);
        return res.status(200).json(response);

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
            populate: [
                { path: 'category', select: 'name' },
                { path: 'owner', select: 'username userType' }
            ],
        });

        res.status(200).json(userOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {

        const order = await Order.findById(id).populate({
            path: 'products.product',
            populate: [
                { path: 'category', select: 'name' },
                { path: 'owner', select: 'username userType' }
            ],
        });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json('Order not found');
        }
        await Order.findByIdAndRemove(id);
        res.json('Order deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};