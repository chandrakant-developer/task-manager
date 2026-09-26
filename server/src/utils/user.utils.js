const Counter = require("../models/counter.model");

exports.generateUserId = async () => {
    const counter = await Counter.findByIdAndUpdate(
        { _id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    return counter.seq;
};