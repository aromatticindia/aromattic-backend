const Users = require("../models/user");
const Orders = require("../models/order");

exports.signup = (req, res) => {
  const { name, email, phone, address } = req.body;

  const user = new Users({ name, email, phone, address });
  user.save((err, user) => {
    if (err) {
      return res.status(401).json({
        error: err,
      });
    }
    return res.json({
      data: user,
    });
  });
};
