const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const jwt = require("jsonwebtoken");
const config = require("config");
const array = require("joi/lib/types/array");

const CourseSchema = new mongoose.Schema({
    id: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String },
    courseImage: { type: String, default: "" },
    dayOfWeek: { type: String, default: "" },
    timeOfDay: { type: String, default: "" },
    capacity: { type: String, default: "" },
    duration: { type: String, default: "" },
    pricePerClass: { type: String, default: "" },
    typeOfClass: { type: String, default: "" },
    classList: { type: Array },
    createdBy: { type: String, default: "" },
    createdOn: { type: String, default: "" },
    updatedBy: { type: String, default: "" },
    updatedOn: { type: String, default: "" },
    creationDate: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
    insertDate: {
        type: Number,
        default: () => {
            return Math.round(new Date() / 1000);
        },
    },
});


const Course = mongoose.model("Course", CourseSchema);

const ClassJoinSchema = new mongoose.Schema({
    userId: { type: String, default: "" },
    detailList: { type: Array },
    insertDate: {
        type: Number,
        default: () => {
            return Math.round(new Date() / 1000);
        },
    },
});

const ClassJoin = mongoose.model("ClassJoin", ClassJoinSchema);

module.exports.Course = Course;
module.exports.ClassJoin = ClassJoin;
