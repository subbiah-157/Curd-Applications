const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const CustomerModel = mongoose.model("users", CustomerSchema);
module.exports = CustomerModel;