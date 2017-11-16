import { app, request, expect } from './config/helpers';

describe("Testes de Integração", () => {
    describe("GET api/users/all", () => {
      it("Deve retornar um JSON com todos os usuários", done => {
        request(app)
          .get("/api/users/all")
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
            done(error);
          });
      });
    });

    describe("GET api/users/:id", () => {
      it("Deve retornar um JSON com apenas um usuário", done => {
        request(app)
          .get("/api/users/1")
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
            done(error);
          });
      });
    });

    describe("POST api/users/new", () => {
      it("Deve cadastrar um novo usuário", done => {
        const usuario = {
          nome: "Teste"
        }

        request(app)
          .post("/api/users/new")
          .send(usuario)
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
            done(error);
          });
      });
    });

    describe("PUT api/users/:id/edit", () => {
      it("Deve editar um usuário existente", done => {
        const usuario = {
          nome: "TestePut"
        }

        request(app)
          .put("/api/users/1/edit")
          .send(usuario)
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
            done(error);
          });
      });
    });

    describe("DELETE api/users/:id", () => {
      it("Deve deletar um usuário existente", done => {
        request(app)
          .delete("/api/users/1")
          .end((error, res) => {
            expect(res.status).to.be.equal(200);
            done(error);
          });
      });
    });
});
