const Thing = require("../models/thing");

// Create a new thing
exports.createThing = async (req, res, next) => {

    try {
        const { thingName, description, hardware } = req.body;
        const userId = req.user.id;

        const user = await Thing.create({
            thingName, description, hardware, user_id:userId
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