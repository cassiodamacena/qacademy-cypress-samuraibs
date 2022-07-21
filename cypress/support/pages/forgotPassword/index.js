/// <reference types="cypress" />

import {el} from './elements'
import toast from '../../components/toast'

class ForgotPasswordPage{

    constructor(){
        this.toast = toast
    }

    go(){
        cy.visit('/forgot-password')
    }

    form(user) {
        cy.get(el.email).clear().type(user.email)
    }

    submit(){
        cy.contains('button[type=submit]', 'Recuperar').click()
    }
    
}

export default new ForgotPasswordPage()