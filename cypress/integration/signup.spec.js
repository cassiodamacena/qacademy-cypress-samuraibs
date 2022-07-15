/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import singnupPage from '../support/pages/signup'

describe('Dado que estou realizando o cadastro', function () {

    beforeEach(function(){
        cy.fixture('signup').then(function(signup){
            this.sucesso = signup.sucesso
            this.emailDuplicado = signup.emailDuplicado
            this.emailInvalido = signup.emailInvalido
            this.senhaInvalida = signup.senhaInvalida
        })
    })

    context('Quando se tratar de um novo e-mail', function () {
    
        it('Então deve cadastrar um novo usuário (utilizando faker)', function () {

            this.sucesso.email = faker.internet.email()

            singnupPage.go()
            singnupPage.form(this.sucesso)
            singnupPage.submit()
            singnupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            // Wait temporário para pegar o texto esperado
            //cy.wait(1000)

            // Comando para pegar o código da página
            //cy.get('body')
        })

        it('Então deve cadastrar um novo usuário (massa fixa "intercept")', function () {

            singnupPage.go()
            singnupPage.form(this.sucesso)

            cy.intercept('POST', '/users', {
                statusCode: 200
            }).as('postUser')

            singnupPage.submit()

            cy.wait('@postUser')

            singnupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })

        it('Então deve cadastrar um novo usuário (massa fixa "limpando banco")', function () {

            cy.task('removeUser', this.sucesso.email)
                .then(function (result) {
                    console.log(result)
                })

            singnupPage.go()
            singnupPage.form(this.sucesso)
            singnupPage.submit()
            singnupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o e-mail já existir', function () {

        before(function () {
            cy.postUser(this.emailDuplicado)
        })

        it('Então deve validar email duplicado"', function () {
            singnupPage.go()
            singnupPage.form(this.emailDuplicado)
            singnupPage.submit()
            singnupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o e-mail é inválido', function () {
        
        it('Então deve validar email inválido', function () {
            singnupPage.go()
            singnupPage.form(this.emailInvalido)
            singnupPage.submit()

            singnupPage.alert.haveText('Informe um email válido')
        })
    })

    context('Quando a senha é menor que 6 caracteres', function () {
    
        beforeEach(function () {
            singnupPage.go()
        })

        const passwords = ['1', '12', '123', '1234', '12345']

        passwords.forEach(function (pass) {
            it('Então deve validar senha inválido: ' + pass + ' caracteres', function () {

                this.senhaInvalida.password = pass

                singnupPage.form(this.senhaInvalida)
                singnupPage.submit()
            })
        })

        afterEach(function () {
            singnupPage.alert.haveText('Pelo menos 6 caracteres')
        })
    })

    context('Quando não informados os campos obrigatórios', function () {

        before(function () {
            singnupPage.go()
            singnupPage.submit()

        })

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        alertMessages.forEach(function(alert){
            it('Então deve validar: ' + alert , function () {
                singnupPage.alert.haveText(alert)
            })
        })

        
    })

})

