const express = require('express');
const { Router } = require("express");
const EmployeeModel = require("./models/EmployeeModel");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const router = Router();


router.post("/saveOne", async (req, res) => {
    const { email } = req.body.data;
    await EmployeeModel.findOne({ email }).then((userExists) => {
        if (!userExists) {
            EmployeeModel.create({ ...req.body.data })
                .then((employeeData) => { res.status(200).json({ employeeData }) })
        } else res.status(404).json({ message: 'user already exists', userExists });
    });
});

router.post("/getOne", async (req, res) => {
    const { email } = req.body;
    await EmployeeModel.findOne(email).then((employeeData) => {
        res.status(200).json({ employeeData })
    });
});

router.get("/getAll", async (req, res) => {
    await EmployeeModel.find({}).then((employeeList) => {
        res.status(200).json({ employeeList });
    });
});

router.post("/updateOne", async (req, res) => {
    const { email } = req.body.data;
    await EmployeeModel.findOneAndUpdate({ email }, { $set: { ...req.body.data } })
        .then((employeeData) => {
            res.status(200).json({ employeeData })
        });
});

router.post("/deleteOne", async (req, res) => {
    const { data } = req.body;
    await EmployeeModel.findOneAndDelete(data).then((employeeData) => {
        res.status(200).json({ employeeData })
    });
});

module.exports = router;