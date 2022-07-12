/// <reference types="cypress" />

import {el} from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class LoginPage {

    constructor(){
        this.toast = toast
        this.alert = alert
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

}

export default new LoginPage()