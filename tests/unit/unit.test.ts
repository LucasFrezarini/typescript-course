import { testDouble, expect } from "./config/helpers";
import User from "../../server/modules/User/service";
import models from "../../server/models/index";

const userDefault = {
  id: 1,
  name: "User default",
  email: "user@default.com",
  password: "123"
}

beforeEach(done => {
  models.User.destroy({
    where: {}
  }).then(() => models.User.create(userDefault))
    .then(() => done())
    .catch((err) => done(err));
});

describe("Testes unitários da Controller", () => {
  describe("Método Create", () => {
    it("Deve criar um novo usuário", done => {
      const newUser = {
        id: 2,
        name: "Teste Create",
        email: "teste@create.com",
        password: "123"
      }

      const userService = new User();

      userService.create(newUser).then((data) => {
        expect(data.dataValues).to.have.all.keys(["createdAt", "email", "id", "name", "password", "updatedAt"]);
        expect(data.dataValues.email).to.eql(newUser.email);
        done();
      }).catch((err) => done(err));
    });
  });

  describe("Método Update", () => {
    it("Deve atualizar um usuário existente", done => {
      const updateUser = {
        name: "Teste Update",
        email: "teste@update.com"
      };

      const userService = new User();

      userService.update(userDefault.id, updateUser).then(data => {
        expect(data).to.be.an('array');
        expect(data[0]).to.be.equals(1);
        done();
      }).catch(err => done(err));
    });
  });

  describe("Método GET ALL", () => {
    it("Deve trazer uma lista com todos os usuários existentes", done => {
      const userService = new User();
      userService.getAll().then((users) => {
        expect(users).to.be.an('array');
        expect(users[0].id).to.be.equals(1);
        done();
      }).catch(err => done(err));
    });
  });

  describe("Método getById", () => {
    it("Retornar um usuário de acordo com o ID passado", done => {
      const userService = new User();
      userService.getById(userDefault.id).then((data) => {
        expect(data.id).to.be.equal(userDefault.id);
        expect(data.name).to.be.equal(userDefault.name);
        done();
      }).catch(err => done(err));
    });
  });

  describe("Método getByEmail", () => {
    it("Retornar um usuário de acordo com o Email passado", done => {
      const userService = new User();
      userService.getByEmail(userDefault.email).then((data) => {
        expect(data.id).to.be.equal(userDefault.id);
        expect(data.name).to.be.equal(userDefault.name);
        done();
      }).catch(err => done(err));
    });
  });

  describe("Método delete", () => {
    it("Deve remover um usuário", done => {
      const userService = new User();

      userService.delete(userDefault.id).then(data => {
        expect(data).to.be.equal(1);
        done();
      }).catch(err => done(err));
    });
  });
})
