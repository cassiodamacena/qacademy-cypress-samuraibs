/// <reference types="cypress" />

import dashPage from '../support/pages/dash'
import {client, provider, appointment} from '../support/factories/dash'

describe('Dado que desejo validar o dashboard', function () {

    context('Quando o cliente faz um agendamento no app mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(client)

            cy.loginApp(client)
            cy.log('Token :' + Cypress.env('loginAppClient'))

            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('Então o mesmo deve ser exibido no dashboard', function () {

            cy.log('Token :' + Cypress.env('loginAppClient'))
            cy.log('Id Ramom: ' + Cypress.env('providerId'))

            //cy.uiLogin(provider)
            cy.loginApp(provider, true)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(Cypress.env('appointmentDate'))
            dashPage.appointmentShouldBeVisible(client, appointment.hour)

        })

    })

})