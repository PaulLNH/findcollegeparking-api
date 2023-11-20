console.log("========== Welcome to Find College Parking ==========");
console.log("Loading db connection...");
const sequelize = require("../config/connection");
console.log("Db connection established.");
console.log("Loading Models...");
const { User } = require("../models");
console.log("Models Loaded.");

console.log("Loading seed json...");
const seeds = require("./seeds.json");
console.log("seeds.json loaded into memory.");

const seedDatabase = async () => {
  console.log("Connecting to database...");
  await sequelize.sync({ force: true });
  console.log("Connected.");

  // ===== USERS =====
  // 1: plaird83@gmail.com
  console.log("Seeding Users...");
  await User.bulkCreate(seeds.Users, { returning: true })
    .then((data) => {
      console.log("Users Import complete:");
      console.log(data);
    })
    .catch((err) => {
      console.error("DB Error:");
      console.error(err);
    });
  console.log("Seeding complete.");

  process.exit(0);
};

seedDatabase();
