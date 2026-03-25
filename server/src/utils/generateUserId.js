const Counter = require("../models/counter.model");

async function generateUserId() {
    const counter = await Counter.findByIdAndUpdate(
        { _id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    return counter.seq;
}

module.exports = generateUserId;