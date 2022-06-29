/// <reference types="cypress" />

import { el } from './elements'

class Header {

    userLoggedIn(username) {
        cy.get(el.loggedUser).should('have.text', username)
        cy.contains(el.loggedUser, username).should('be.visible')
    }
    
}

export default new Header()