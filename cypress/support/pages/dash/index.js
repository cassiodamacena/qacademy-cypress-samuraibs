/// <reference types="cypress" />

import { el } from './elements'
import header from '../../components/heder'

class DashPage {

    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar).should('be.visible')
    }

    selectDay(appointmentDate) {

        let today = new Date()
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if (today.getDate() === lastDayOfMonth.getDate()) {
            cy.log('HOJE É o último dia do mês')
            cy.get(el.nextMonthButton).should('be.visible').click()

            // Checkpoint para garantir a troca do mês
            cy.log(appointmentDate.getMonth())

            let monthName
            switch (appointmentDate.getMonth()) {
                case 0: monthName = 'Janeiro'; break;
                case 1: monthName = 'Fevereiro'; break;
                case 2: monthName = 'Março'; break;
                case 3: monthName = 'Abril'; break;
                case 4: monthName = 'Maio'; break;
                case 5: monthName = 'Junho'; break;
                case 6: monthName = 'Julho'; break;
                case 7: monthName = 'Agosto'; break;
                case 8: monthName = 'Setembro'; break;
                case 9: monthName = 'Outubro'; break;
                case 10: monthName = 'Novembro'; break;
                case 11: monthName = 'Dezembro'; break;
                default:
                    break;
            }

            cy.contains(el.monthYearName, monthName).should('be.visible')
        } else {
            cy.log(appointmentDate.getMonth())
            cy.log('NÃO É o último dia do mês')
        }
        //now.setDate(now.getDate() + 3)

        const target = new RegExp('^' + appointmentDate.getDate() + '$', 'g')
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