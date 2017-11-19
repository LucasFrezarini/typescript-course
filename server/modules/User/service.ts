import { IUser, IUserDetails, createUsers, createUserById, createUserByEmail, createUser } from "./interface";
import * as Bluebird from "bluebird";
import models from "../../models/index";

class User implements IUser {
  public id: number;
  public name : string;
  public email: string;
  public password: string;

  constructor(){};

  create(user: IUser) : Bluebird<any> {
    return models.User.create(user);
  }

  getAll() : Bluebird<IUser[]> {
    return models.User.findAll({
      order: ['name']
    }).then(createUsers);
  }
  getById(id : number) : Bluebird<IUserDetails> {
    return models.User.findOne({
      where: {id}
    }).then(createUserById);
  }
  getByEmail(email : string) : Bluebird<IUserDetails> {
    return models.User.findOne({
      where: {email}
    }).then(createUserByEmail);
  }
  update(id : number, user : any) {
    return models.User.update(user, {
      where: {id},
      fields: ['name', 'email', 'password']
    });
  }
  delete(id : number) {
    return models.User.destroy({
      where: {id}
    });
  }
}

export default User;
