const AccessKey = require("../models/accessKey");

const generateBase64Key = () => {
    const randomBuffer = crypto.randomBytes(32); 
    return randomBuffer.toString('base64');
};
// Create a new channel
exports.createKey = async (req, res, next) => {

    try {
        const { description, readable, updatable,channel_id } = req.body;
        if (!description || !channel_id || typeof readable !== 'boolean' || typeof updatable !== 'boolean') {
            return res.status(400).json({ success: false, error: 'Invalid request body' });
        }

        const keyValue = generateBase64Key();

        const createKey = await AccessKey.create({
            description, readable, updatable,keyValue
        });

        res.status(200).json({
            success: true,
            msg:"Successfully created",
        });
    } catch (error) {
        return next(error);
    }
};