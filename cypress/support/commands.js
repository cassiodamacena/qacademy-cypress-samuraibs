/// <reference types="cypress" />

import loginPage from './pages/login'
import dashPage from './pages/dash'
import moment from 'moment'
import { apiServer } from '../../cypress.json'

Cypress.Commands.add('postUser', function (user) {
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })

    cy.request({
        method: 'POST',
        url: apiServer + '/users',
        body: user
    }
    ).then(function (response) {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('recoveryPass', function (email) {
    cy.request({
        method: 'POST',
        url: apiServer + '/password/forgot',
        body: { email: email }
    }
    ).then(function (response) {
        expect(response.status).to.eq(204)
    })

    cy.task('findToken', this.user.email)
        .then(function (result) {
            Cypress.env('recoveryToken', result.token)
        })
})


Cypress.Commands.add('loginApp', function (user) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: apiServer + '/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('loginAppClient', response.body.token)
    })

})

Cypress.Commands.add('setProviderId', function (providerEmail) {
    cy.request({
        method: 'GET',
        url: apiServer + '/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('loginAppClient')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)

        const listProvider = response.body

        listProvider.forEach(function (provider) {
            if (provider.email === providerEmail) {
                Cypress.env('providerId', provider.id)
            }
        });
    })
})

Cypress.Commands.add('createAppointment', function (hour) {

    let now = new Date()
    now.setDate(now.getDate() + 3)
    Cypress.env('appointmentDay', now.getDate())

    const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }

    cy.request({
        method: 'POST',
        url: apiServer + '/appointments',
        headers: {
            authorization: 'Bearer ' + Cypress.env('loginAppClient')
        },
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
    })

})

Cypress.Commands.add('uiLogin', function (provider) {
    loginPage.go()
    loginPage.form(provider)
    loginPage.submit()
    dashPage.header.userLoggedIn(provider.name)
})