/// <reference types="cypress" />

import moment from 'moment'

Cypress.Commands.add('postUser', function (user) {
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })

    cy.request(
        'POST',
        'http://localhost:3333/users',
        user
    ).then(function (response) {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('recoveryPass', function (email) {
    cy.request(
        'POST',
        'http://localhost:3333/password/forgot',
        {
            email: email
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
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('loginAppClient', response.body.token)
    })

})

Cypress.Commands.add('setProviderId', function (providerEmail) {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3333/providers',
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

    const date = moment(now).format('YYYY-MM-DD ' + hour + ':00')

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/appointments',
        headers: {
            authorization: 'Bearer ' + Cypress.env('loginAppClient')
        },
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
    })

})