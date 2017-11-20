import * as jwt from "jwt-simple";
import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';
import models from '../../server/models/index';

describe("Testes de Integração", () => {

  let config = require('../../server/config/env/config')();
  let token;

  const userTest = {
    id: 100,
    name: "Usuário de Teste",
    email: "usuario@teste.com",
    password: "senha",
  }

  const userDefault = {
    id: 1,
    name: "Usuário Default",
    email: "usuario@default.com",
    password: "password",
  }

  let id : Number;

  beforeEach(done => {
    models.User.destroy({
      where: {}
    }).then(() => models.User.create(userDefault))
      .then(user => {
        token = jwt.encode({id: user.id}, config.secret);
        return models.User.create(userTest);
      }).then((user) => done())
      .catch((err) => done(err));
  });

  describe("POST /token", () => {
    it("Deve gerar token quando as credenciais são válidas", done => {
      const credentials = {
        email: userDefault.email,
        password: userDefault.password
      }

      request(app)
        .post("/token")
        .send(credentials)
        .end((error, res) => {
          expect(res.status).to.be.equal(HTTPStatus.OK);
          expect(res.body.token).to.be.equal(token);
          done(error);
        });
    });

    it("Não deve gerar token ao passar credenciais inválidas", done => {
      const credentials = {
        email: "invalid@credentials.com",
        password: "hackingintothesystem"
      }

      request(app)
        .post("/token")
        .send(credentials)
        .end((error, res) => {
          expect(res.status).to.be.equal(HTTPStatus.UNAUTHORIZED);
          expect(res.body).to.be.empty;
          done(error);
        });
    });
  });

  describe("GET api/users/all", () => {
    it("Deve retornar um Array com todos os usuários", done => {
      request(app)
        .get("/api/users/all")
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).to.be.equal(HTTPStatus.OK);
          expect(res.body.payload).to.be.an("array");
          expect(res.body.payload[0].name).to.be.equal(userDefault.name);
          expect(res.body.payload[0].email).to.be.equal(userDefault.email);
          done(error);
        });
    });
  });

  describe("GET api/users/:id", () => {
    it("Deve retornar um JSON com apenas um usuário", done => {
      request(app)
        .get(`/api/users/${userDefault.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).to.be.equal(HTTPStatus.OK);
          expect(res.body.payload.id).to.be.equal(userDefault.id);
          expect(res.body.payload).to.have.all.keys(["id", "name", "email", "password"]);
          id = res.body.payload.id;
          done(error);
        });
    });
  });

  describe("POST api/users/new", () => {
    it("Deve cadastrar um novo usuário", done => {
      const usuario = {
        id: 2,
        name: "Teste Create",
        email: "teste@create.com",
        password: "123"
      }

      request(app)
        .post("/api/users/new")
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .send(usuario)
        .end((error, res) => {
          expect(res.status).to.be.equal(HTTPStatus.OK);
          expect(res.body.payload.id).to.eql(usuario.id);
          expect(res.body.payload.name).to.eql(usuario.name);
          expect(res.body.payload.email).to.eql(usuario.email);
          done(error);
        });
    });
  });

  describe("PUT api/users/:id/edit", () => {
    it("Deve editar um usuário existente", done => {
      const usuario = {
        name: "TesteUpdate",
        email: "update@email.com"
      }

      request(app)
        .put(`/api/users/${id}/edit`)
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .send(usuario)
        .end((error, res) => {
          expect(res.status).to.be.equal(HTTPStatus.OK);
          expect(res.body.payload[0]).to.eql(1);
          done(error);
        });
    });
  });

  describe("DELETE api/users/:id", () => {
    it("Deve deletar um usuário existente", done => {
      request(app)
        .delete(`/api/users/${id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).to.be.equal(HTTPStatus.OK);
          expect(res.body.payload).to.be.equal(1);
          done(error);
        });
    });
  });
});
