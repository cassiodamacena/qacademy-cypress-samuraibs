/// <reference types="cypress" />

import { el } from './elements'
import header from '../../components/heder'

class DashPage {

    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 }).should('be.visible')
    }

    selectDay(day) {
        const target = new RegExp('^' + day + '$', 'g')
        cy.contains(el.boxDay, target).click()
    }

    appointmentShouldBeVisible(client, appointmentHour) {
        cy.contains('div', client.name)
            .should('be.visible')
            .parent()
            .contains(el.boxHour, appointmentHour)
            .should('be.visible')
    }

}

export default new DashPage()