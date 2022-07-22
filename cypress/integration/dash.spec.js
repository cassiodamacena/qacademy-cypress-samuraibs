/// <reference types="cypress" />

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Dado que desejo validar o dashboard', function () {

    context('Quando o cliente faz um agendamento no app mobile', function () {

        const data = {
            client: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramo@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.client)

            cy.loginApp(data.client)
            cy.log('Token :' + Cypress.env('loginAppClient'))

            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)
        })

        it('Então o mesmo deve ser exibido no dashboard', function () {

            cy.log('Token :' + Cypress.env('loginAppClient'))
            cy.log('Id Ramom: ' + Cypress.env('providerId'))

            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(Cypress.env('appointmentDay'))
            dashPage.appointmentShouldBeVisible(data.client, data.appointmentHour)

        })

    })

})