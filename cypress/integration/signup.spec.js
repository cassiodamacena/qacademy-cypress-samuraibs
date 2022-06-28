import { faker } from '@faker-js/faker';
import singnupPage from '../support/pages/signup'

describe('Dado que estou realizando o cadastro', function () {

    context('Quando se tratar de um novo e-mail', function () {
        const user = {
            name: 'Cassio Damacena',
            email: 'cassio@barbershop.com',
            password: '123456'
        }

        it('Então deve cadastrar um novo usuário (utilizando faker)', function () {

            user.email = faker.internet.email()

            singnupPage.go()
            singnupPage.form(user)
            singnupPage.submit()
            singnupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            // Wait temporário para pegar o texto esperado
            //cy.wait(1000)

            // Comando para pegar o código da página
            //cy.get('body')
        })

        it('Então deve cadastrar um novo usuário (massa fixa "intercept")', function () {

            singnupPage.go()
            singnupPage.form(user)

            cy.intercept('POST', '/users', {
                statusCode: 200
            }).as('postUser')

            singnupPage.submit()

            cy.wait('@postUser')

            singnupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })

        it('Então deve cadastrar um novo usuário (massa fixa "limpando banco")', function () {

            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            singnupPage.go()
            singnupPage.form(user)
            singnupPage.submit()
            singnupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o e-mail já existir', function () {
        const user = {
            name: 'Cassio Damacena Duplicado',
            email: 'cassiodamacena@barbershop.com',
            password: '123456',
            is_provider: true
        }

        before(function () {
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

        it('Então deve validar email duplicado"', function () {
            singnupPage.go()
            singnupPage.form(user)
            singnupPage.submit()
            singnupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o e-mail é inválido', function () {
        const user = {
            name: 'Elisabeth',
            email: 'elisabet.barbershop.com',
            password: '123456',
            is_provider: true
        }
        it('Então deve validar email inválido', function () {
            singnupPage.go()
            singnupPage.form(user)
            singnupPage.submit()

            singnupPage.alertHaveText('Informe um email válido')
        })
    })

    context('Quando a senha é menor que 6 caracteres', function () {
        const user = {
            name: 'Jason',
            email: 'jason@barbershop.com',
            password: '1',
            is_provider: true
        }
        beforeEach(function () {
            singnupPage.go()
        })

        const passwords = ['1', '12', '123', '1234', '12345']

        passwords.forEach(function (pass) {
            it('Então deve validar senha inválido: ' + pass + ' caracteres', function () {
                user.password = pass
                singnupPage.form(user)
                singnupPage.submit()
            })
        })

        afterEach(function () {
            singnupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('Quando não informados os campos obrigatórios', function () {
        const user = {
            name: 'Elisabeth',
            email: 'elisabet.barbershop.com',
            password: '123456',
            is_provider: true
        }

        before(function () {
            singnupPage.go()
            singnupPage.submit()

        })

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        alertMessages.forEach(function(alert){
            it('Então deve validar: ' + alert , function () {
                singnupPage.alertHaveText(alert)
            })
        })

        
    })

})

