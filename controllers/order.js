const Users = require("../models/user");
const Orders = require("../models/order");

exports.saveOrderInfo = (req, res) => {
  const { buyerId, items, orderDateTime, transactionId } = req.body;

  const order = new Orders({
    buyerId,
    items,
    orderDateTime,
    transactionId,
    orderStatus: "PENDING",
  });
  order.save((err, order) => {
    if (err) {
      return res.status(401).json({
        error: err,
      });
    }
    return res.json({
      data: order,
    });
  });
};
