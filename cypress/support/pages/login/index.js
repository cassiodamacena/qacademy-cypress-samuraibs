/// <reference types="cypress" />

import {el} from './elements'
import toast from '../../components/toast'

class LoginPage {

    constructor(){
        this.toast = toast
    }

    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.email).clear().type(user.email)
        cy.get(el.senha).clear().type(user.password)
    }

    submit(){
        cy.contains(el.submitLogin).click()
    }

    alertHaveText(expectedMessage){
        cy.contains(el.alertError, expectedMessage).should('be.visible')
    }

}

export default new LoginPage()