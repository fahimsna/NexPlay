const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| ADMIN LOG
|--------------------------------------------------------------------------
|
| Sprint 1: audit trail for admin actions (company approve/reject, etc.)
|
|--------------------------------------------------------------------------
*/

const adminLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    targetType: {
      type: String,
      enum: ["User", "Company", "Advertisement", "Campaign", "Content", "System"],
      default: "Company",
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    details: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

adminLogSchema.index({ adminId: 1 });
adminLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("AdminLog", adminLogSchema);
