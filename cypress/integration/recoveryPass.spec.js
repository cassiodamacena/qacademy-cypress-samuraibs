/// <reference types="cypress" />

import forgotPassPage from '../support/pages/forgotPassword'
import resetPassPage from '../support/pages/resetPassword'

describe('Resgate de senha', function(){

    before(function(){
        cy.fixture('recovery').then(function(recovery){
            this.user = recovery
        })
    })

    context('Quando o usuário esquece a senha', function(){

        before(function(){
            cy.postUser(this.user)
        })

        it('Deve permiti-lo resgatar por email', function(){
            forgotPassPage.go()
            forgotPassPage.form(this.user)
            forgotPassPage.submit()

            const message = "Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada."

            forgotPassPage.toast.shouldHaveText(message)
        })

    })

    context('Quando o usuário solicita o resgate de senha', function(){

        before(function(){
            cy.postUser(this.user)
            cy.recoveryPass(this.user.email)
        })

        it('Deve permitir cadastrar uma nova senha', function(){
            const token = Cypress.env('recoveryToken')
            resetPassPage.go(token)
            resetPassPage.form('123456')
            resetPassPage.submit()

            const expectedMessage = 'Agora você já pode logar com a sua nova senha secreta.'
            resetPassPage.toast.shouldHaveText(expectedMessage)

        })

    })

})