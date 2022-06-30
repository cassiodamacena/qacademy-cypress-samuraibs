/// <reference types="cypress" />

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', function () {

    context('Quando o usuário é muito bom', function () {

        const user = {
            name: 'Cassio Damacena',
            email: 'cassio@barbershop.com',
            password: '123456',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })

    })

    context('Quando o usuário é bom mas a senha está incorreta', function () {

        let user = {
            name: 'Celso',
            email: 'celso@barbershop.com',
            password: '123456',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function(){
                user.password = '654321'
            })
        })

        it('Deve notificar erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const expectedMessage = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldHaveText(expectedMessage)
        })

    })

})