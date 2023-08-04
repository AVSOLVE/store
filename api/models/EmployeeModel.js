const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    dob: {type: String, required: true},
    gender: {type: String, required: true},
    education: {type: String, required: true},
    company: {type: String, required: true},
    experience: {type: String, required: true},
    package: {type: String, required: true},
});

const EmployeeModel = new mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeModel;