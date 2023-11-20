const { User } = require("../../models");
const { http } = require("../../constants");


const users = {
  // Authenticated methods (will have req.user.id)
  getUsers: async (req, res) => {
    try {
      let response = {};

      const users = await User.findAll({
        attributes: ["public_id", "first_name", "last_name"],
      });
      response = users;

      res.status(http.Success.code).json(response);
    } catch (err) {
      return res
        .status(http.InternalServerError.code)
        .json(http.InternalServerError);
    }
  }
};

module.exports = users;
