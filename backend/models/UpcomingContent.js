const mongoose = require("mongoose");

const upcomingContentSchema = new mongoose.Schema(
{
title: {
type: String,
required: true,
},

description: {
type: String,
required: true,
},

releaseDate: {
type: Date,
required: true,
},

genre: {
type: String,
required: true,
},

image: {
type: String,
default: "",
},

status: {
type: String,
enum: ["Coming Soon", "Released"],
default: "Coming Soon",
},
},
{
timestamps: true,
}
);

module.exports = mongoose.model(
"UpcomingContent",
upcomingContentSchema
);