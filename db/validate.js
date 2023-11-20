const sequelize = require("../config/connection");
const { User, Tenant, Role, UserTenant } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync();
  console.log("========== Validation of Seeded Data =========");

  // ===== Validation =====
  // const user = await User.findOne({
  //   where: { email: userEmail },
  //   attributes: { exclude: ["password", "id", "updatedAt", "deletedAt"] },
  //   include: {
  //     model: UserTenant,
  //     where: { TenantId: hsClientId },
  //     include: [
  //       { model: Tenant, attributes: ["client_id", "display_name", "tagline"] },
  //       {
  //         model: Role,
  //         attributes: ["display_name"],
  //         through: { attributes: [] },
  //       },
  //     ],
  //   },
  // });

  // const res = {
  //   user: {
  //     id: user.public_id,
  //     email: user.email,
  //     firstName: user.given_name,
  //     lastName: user.family_name,
  //     tenant: user.UserTenants[0].Tenant.display_name,
  //     role: user.UserTenants[0].Roles[0].display_name,
  //   },
  // };

  // console.log(JSON.stringify(user, null, 2));
  // console.log(res);

  const req = {
    user: {
      id: "25a1b3a3-d3e5-4c3f-8cb9-133b7d63da5f",
    },
    clientId: "handyschedule",
  };
  const { id } = req.user;
  // let response = {};

  const { id: TenantId } = await Tenant.findOne({
    where: { client_id: req.clientId },
    attributes: ["id"],
  });
  await User.findOne({
    where: { public_id: id },
    attributes: ["public_id", "family_name", "given_name", "avatar"],
    include: {
      model: UserTenant,
      where: { TenantId },
      include: [
        {
          model: Tenant,
          attributes: ["client_id", "display_name", "tagline"],
        },
        {
          model: Role,
          attributes: ["display_name"],
          through: { attributes: [] },
        },
      ],
    },
  });

  // response = {
  //   public_id: user.public_id,
  //   email: user.email,
  //   given_name: user.given_name,
  //   family_name: user.family_name,
  //   role: user.UserTenants[0].Roles[0],
  // };

  process.exit(0);
};

seedDatabase();
