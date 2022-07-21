/// <reference types="cypress" />

import {el} from './elements'
import toast from '../../components/toast'

class ResetPasswordPage{

    constructor(){
        this.toast = toast
    }

    go(token){
        cy.visit('/reset-password?token='+token)
    }

    form(password) {
        cy.get(el.password).clear().type(password)
        cy.get(el.confirmPassword).clear().type(password)
    }

    submit(){
        cy.contains('button[type=submit]', 'Alterar senha').click()
    }
    
}

export default new ResetPasswordPage()