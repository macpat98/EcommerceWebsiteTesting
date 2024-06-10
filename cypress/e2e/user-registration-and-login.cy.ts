// © Example Copyright 2024. All Rights Reserved.

import { UrlPath } from '../support/enums/url-path';

describe('User Registration and Login', () => {
  before(() => {
    // Arrange
    cy.wrap(getRandomValidCredentials()).as('randomCredentials');
  });

  context('Registration with valid credentials', () => {
    it('creates a new user account', function () {
      // Act
      cy.log(`***Step 1: Visiting registration page: ${Cypress.config().baseUrl}${UrlPath.Registration}***`);
      cy.visit(UrlPath.Registration);

      cy.log(`***Step 2: Filling registration form***`);
      fillRegistrationForm(this.randomCredentials.email, this.randomCredentials.password);
      cy.getBySel('submit-registration-button').click();

      // Assert
      cy.log(`***Step 3: Verifying registration***`);
      cy.url().should('include', UrlPath.LogIn);
      cy.getBySel('successful-registration-msg')
        .should('have.text', `User ${this.randomCredentials.email} was successfully created!`);
    });
  });

  context(`Log in with valid credentials using ${UrlPath.LogIn}`, () => {
    it('redirects logged in user to home page', function () {
      // Act
      cy.log(`***Step 1: Visiting login page: ${Cypress.config().baseUrl}${UrlPath.LogIn}***`);
      cy.visit(UrlPath.LogIn);

      cy.log(`***Step 2: Filling login form***`);
      fillLogInForm(this.randomCredentials.email, this.randomCredentials.password);
      cy.getBySel('submit-login-button').click();

      // Assert
      cy.log(`***Step 3: Verifying login***`);
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.getBySel('successful-login-msg')
        .should('have.text', `User ${this.randomCredentials.email} was successfully logged in!`);
    });
  });
});

function getRandomValidCredentials(): Credentials {
  return {
    email: `testEmail${Math.random()}@domain.com`,
    password: `T3$tP@sSw0Rd!${Math.random()}`
  };
}

function fillRegistrationForm(email: string, password: string) {
  cy.getBySel('registration-form').within(() => {
    cy.log(`***inserting valid email: ${email}***`);
    cy.getBySel('email-registration-input').type(email);

    cy.log(`***inserting valid password: ${password}***`);
    cy.getBySel('password-registration-input').type(password);

    cy.log(`***accepting terms and condition***`);
    cy.getBySel('rules-checkbox').check();

    cy.log(`***accepting storage and processing of personal data***`);
    cy.getBySel('personal-data-checkbox').check();
  });
}

function fillLogInForm(email: string, password: string) {
  cy.getBySel('login-form').within(() => {
    cy.log(`***inserting user email: ${email}***`);
    cy.getBySel('email-login-input').type(email);

    cy.log(`***inserting user password: ${password}***`);
    cy.getBySel('password-login-input').type(password);
  });
}