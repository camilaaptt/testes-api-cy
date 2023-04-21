import contrato from "../contracts/usuarios.contract";
import faker from "faker-br";

describe('Testes da Funcionalidade Usuários', () => {
     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(20)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let nome = faker.name.firstName();
          let email = faker.internet.email();
          let senha = faker.internet.password();

          cy.cadastrarUsuario(nome, email, senha, "true")
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario("Fulano da Silva", "fulano@qa.com", "teste", "true")
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.message).to.equal('Este email já está sendo usado')
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let nome = faker.name.firstName();
          let email = faker.internet.email();
          let senha = faker.internet.password();

          cy.cadastrarUsuario(nome, email, senha, "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         body:
                         {
                              "nome": nome,
                              "email": email,
                              "password": senha,
                              "administrador": "false"
                         }
                    }).then(response => {
                         expect(response.status).to.equal(200)
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                    })
               })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let nome = faker.name.firstName();
          let email = faker.internet.email();
          let senha = faker.internet.password();

          cy.cadastrarUsuario(nome, email, senha, "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                         expect(response.status).to.equal(200)
                    })
               })
     });


});
