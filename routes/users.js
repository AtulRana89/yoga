const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Course } = require("../models/course");
const { ClassJoin } = require("../models/course");
mongoose.set("debug", true);


router.post("/course", async (req, res) => {
  const userId = req.body.userId;
  const number = req.body.detailList.length;

  let courses = "";

  req.body.detailList.forEach((course) => {
    const { dayOfWeek, timeOfDay } = course;

    courses += `${dayOfWeek} (${timeOfDay}), `;
  });

  await Course.deleteMany({ userId });

  // Create a new document
  await Course.create({ userId, detailList: req.body.detailList });

  return res.send({ uploadResponseCode: "SUCCESS", userId: userId, number: number, courses: courses, message: "successful upload - all done!" });
});

router.get("/course", async (req, res) => {
  let result = await Course.find();
  return res.send({ uploadResponseCode: "SUCCESS", detailList: result });
});

router.post("/class", async (req, res) => {
  // await ClassJoin.create(req.body);
  // return res.send({ statusCode: 200, message: "Success", data: { message: "Class Join Successfully" } });
  const { userId, detailList } = req.body;

  const uniqueDetailList = [...new Set(detailList)];

  const existingClassJoin = await ClassJoin.findOne({ userId });

  if (existingClassJoin) {
    const mergedDetailList = [...new Set([...existingClassJoin.detailList, ...uniqueDetailList])];

    await ClassJoin.updateOne({ userId }, { detailList: mergedDetailList });

    return res.send({ statusCode: 200, message: "Success", data: { message: "Class Join Successfully" } });
  } else {
    await ClassJoin.create({ userId, detailList: uniqueDetailList });

    return res.send({ statusCode: 200, message: "Success", data: { message: "Class Join Successfully" } });
  }
});


module.exports = router;
