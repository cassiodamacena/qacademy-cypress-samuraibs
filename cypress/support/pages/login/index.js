/// <reference types="cypress" />

import {el} from './elements'

class LoginPage {

    go() {
        cy.visit('')
    }

    form(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.senha).type(user.password)
    }

    submit(){
        cy.contains(el.submitLogin).click()
    }

}

export default new LoginPage()