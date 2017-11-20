import * as bcrypt from "bcrypt";

import { DataTypes, Sequelize } from "sequelize";

export default (sequelize : Sequelize, dataTypes : DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  user.beforeCreate(hashPassword);
  user.beforeUpdate(hashPassword);

  return user;
}

// function hashPassword(user) {
//   const salt = bcrypt.genSaltSync(10);
//   user.set("password", bcrypt.hashSync(user.password, salt));
// }

const hashPassword = user => {
    return bcrypt.genSalt(10).then(salt => bcrypt.hash(user.password, salt))
      .then(hash => user.set("password", hash))
      .catch(err => console.error(err));
};
