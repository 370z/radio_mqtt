const Channel = require("../models/channel");

// Create a new channel
exports.createChannel = async (req, res, next) => {

    try {
        const { channelName, description, channelType, thing_id } = req.body;

        const user = await Channel.create({
            channelName, description, channelType, thing_id
        });

        res.status(200).json({
            success: true,
            msg:"Successfully created",
        });
    } catch (error) {
        // console.error(error);
        return next(error);
    }
};