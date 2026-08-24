const Company = require("../models/Company");
const User = require("../models/User");
const AdminLog = require("../models/AdminLog");

/*
|--------------------------------------------------------------------------
| Sprint 1: Admin Dashboard + Company Verification
|--------------------------------------------------------------------------
*/

const logAction = async (adminId, action, targetType, targetId, details) => {
  try {
    await AdminLog.create({ adminId, action, targetType, targetId, details });
  } catch (error) {
    // Logging should never break the actual admin action
    console.error("Admin log error:", error.message);
  }
};

// =====================================
// DASHBOARD STATS
// =====================================
const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalCompanies, pendingCompanies, approvedCompanies, rejectedCompanies] =
      await Promise.all([
        User.countDocuments(),
        Company.countDocuments(),
        Company.countDocuments({ status: "pending" }),
        Company.countDocuments({ status: "approved" }),
        Company.countDocuments({ status: "rejected" }),
      ]);

    res.status(200).json({
      totalUsers,
      totalCompanies,
      pendingCompanies,
      approvedCompanies,
      rejectedCompanies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET ALL COMPANIES (optionally filter by status)
// =====================================
const getAllCompanies = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      filter.status = status;
    }

    const companies = await Company.find(filter)
      .populate("ownerId", "fullName username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// APPROVE COMPANY
// =====================================
const approveCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        rejectionReason: "",
      },
      { new: true },
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    await logAction(
      req.user.id || req.user._id,
      "COMPANY_VERIFIED",
      "Company",
      company._id,
      `Approved company "${company.companyName}"`,
    );

    res.status(200).json({
      message: "Company approved",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// REJECT COMPANY
// =====================================
const rejectCompany = async (req, res) => {
  try {
    const { reason } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        rejectionReason: reason || "Did not meet verification requirements",
      },
      { new: true },
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    await logAction(
      req.user.id || req.user._id,
      "COMPANY_REJECTED",
      "Company",
      company._id,
      `Rejected company "${company.companyName}": ${company.rejectionReason}`,
    );

    res.status(200).json({
      message: "Company rejected",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET ALL USERS
// =====================================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET ACTIVITY LOG (paginated)
// =====================================
const getActivityLog = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      AdminLog.find()
        .populate("adminId", "fullName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      AdminLog.countDocuments(),
    ]);

    res.status(200).json({
      logs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllCompanies,
  approveCompany,
  rejectCompany,
  getAllUsers,
  getActivityLog,
};
