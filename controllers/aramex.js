

import axios from 'axios';


const aramexApiUrl = 'https://ws.sbx.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/json/CalculateRate';

const pickUpUrl = 'https://ws.sbx.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreatePickup';
const shipmentUrl = 'https://ws.sbx.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreateShipments';

// Controller for rate calculation
export const calculateRateController = async (req, res) => {
    try {
        // Get the request body from the client
        const requestBody = req.body;

        // Make a POST request to the Aramex API
        const response = await axios.post(aramexApiUrl, requestBody);

        // Send the Aramex API response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ error: error });
    }
};




export const createPickUpController = async (req, res) => {
    try {
        // Get the request body from the client
        const requestBody = req.body;

        // Make a POST request to the Aramex API
        const response = await axios.post(pickUpUrl, requestBody);

        // Send the Aramex API response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ error: error });
    }
};

export const createShipmentController = async (req, res) => {
    try {
        // Get the request body from the client
        const requestBody = req.body;

        // Make a POST request to the Aramex API
        const response = await axios.post(shipmentUrl, requestBody);

        // Send the Aramex API response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ error: error});
    }
};
