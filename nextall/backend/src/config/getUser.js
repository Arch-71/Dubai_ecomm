const Users = require("../models/User");
const Shop = require('../models/Shop');

exports.getUser = async (req, res,requireVerify) => {
	if (!req.user) {
		return res
			.status(401)
			.json({ success: false, message: "You Must Be Logged In." });
	}

	try {
		const user = await Users.findById(req.user._id);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User Not Found." });
		}
		if (!requireVerify && !user.isVerified) {
			return res
				.status(404)
				.json({ success: false, message: "User Email Is Not Verified." });
		}

		return user;
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error." });
	}
};

exports.getAdmin = async (req) => {
    if (!req.user) {
        const error = new Error("You Must Be Logged In.");
        error.status = 401;
        throw error;
    }
    const user = await Users.findById(req.user._id);
    if (!user) {
        const error = new Error("User Not Found.");
        error.status = 404;
        throw error;
    }
    if (!user.role.includes("admin")) {
        const error = new Error("Access Denied.");
        error.status = 401;
        throw error;
    }
    return user;
};

exports.getVendor = async (req, res) => {
	try {
		if (!req.user) {
			return res
				.status(401)
				.json({ success: false, message: "You Must Be Logged In." });
		}

		const user = await Users.findById(req.user._id);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User Not Found." });
		}
	if (!user.role.includes("vendor")) {
			return { error: "Access Denied.", status: 401 };
		}
	return user
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal server error." });
	}
};
