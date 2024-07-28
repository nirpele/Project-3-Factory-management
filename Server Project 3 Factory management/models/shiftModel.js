const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    employeeId: String,
    date: Date,
    startingHour: Number,
    endingHour: Number,
    sumHours:Number
  },
  { versionKey: false }
);

const Shift = mongoose.model("Shift", shiftSchema, "shifts");

module.exports = Shift;
