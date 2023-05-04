import { DeviceItem } from "../models/devices/deviceItemModel.js";
import { DevicesCategories } from "../models/devices/devicesCategoriesModel.js";


export const getDevicesCategories = async (req, res) => {

    try {
        const data = await DevicesCategories.find({});
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

export const getDeviceItems = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await DevicesCategories.findById(id).populate('deviceList');
        if (!data) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: data,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getItemById = async (req, res) => {

    const { id } = req.params;
    try {

        const item = await DeviceItem.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'no Data Found' });
        }
        return res.json({
            msg: "success",
            results: item,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

