/// <reference types="cypress" />

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', function(){

    context('Quando o usuário é muito bom', function(){

        const user = {
            name: 'Cassio Damacena',
            email: 'cassio@barbershop.com',
            password: '123456'
        }

        it('Deve logar com sucesso', function(){
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            
            dashPage.header.userLoggedIn(user.name)
        })

    })

})