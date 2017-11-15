import { app, request, expect } from './config/helpers';

describe("Testes de Integração", () => {
    describe("GET /", () => {
      it("Deve retornar a mensgem de Hello World", done => {
        request(app)
          .get("/")
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.text).to.be.equal("Hello World!");
            done(error);
          });
      });
    });

    describe("GET /ola/:nome", () => {
      it("Deve retornar a mensgem de Hello Typescript Course", done => {
        const nome = `Typescript Course`;
        request(app)
          .get(`/ola/${nome}`)
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.text).to.be.equal("olá Typescript Course!");
            done(error);
          });
      });
    });
    describe("GET api/users/all", () => {
      it("Deve retornar um JSON com todos os usuários", done => {
        request(app)
          .get("api/users/all")
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
          });
      });
    });

    describe("GET api/users/:id", () => {
      it("Deve retornar um JSON com apenas um usuário", done => {
        request(app)
          .get("api/users/1")
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
          });
      });
    });

    describe("POST api/users/new", () => {
      it("Deve cadastrar um novo usuário", done => {
        const usuario = {
          nome: "Teste"
        }

        request(app)
          .post("api/users/all")
          .send(usuario)
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
          });
      });
    });

    describe("PUT api/users/:id/edit", () => {
      it("Deve editar um usuário existente", done => {
        const usuario = {
          nome: "TestePut"
        }

        request(app)
          .put("api/users/1/edit")
          .send(usuario)
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
          });
      });
    });

    describe("DELETE api/users/:id", () => {
      it("Deve deletar um usuário existente", done => {
        request(app)
          .delete("api/users/1")
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
          });
      });
    });
});
