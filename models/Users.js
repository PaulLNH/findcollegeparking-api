const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    public_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [10, 10],
        isInt: true,
      }
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email_opt_in: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      is: ["/^[0-9a-f]{64}$/i"], // Validation for hashed password
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    // The name of the model. The model will be stored in `sequelize.models` under this name.
    // This defaults to class name i.e. User in this case. This will control name of auto-generated
    // foreignKey and association naming
    modelName: "User",
    // timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: false,
    // Sequelize instance
    sequelize,
  }
);

module.exports = User;
