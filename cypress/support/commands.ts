// © Example Copyright 2024. All Rights Reserved.

declare namespace Cypress {
    interface Chainable {
        /**
        * getBySel function for getting elements by preselected ***data-cy*** attribute.
        * @param {string} selector - attribute's value e.g.: [data-cy=${***selector***}]
        * @param options - optional, same as in standard {@link https://docs.cypress.io/api/commands/get cy.get()}
        * 
        * see more: {@link https://docs.cypress.io/guides/references/best-practices}
        */
        getBySel(
            selector: string,
            options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
        ): Chainable<JQuery<HTMLElement>>;

        /**
        * login function within basic auth.
        * @param {Credentials} credentials - username and password
        * @param url - optional, baseUrl (home page) by default if not provided
        */
        login(credentials: Credentials, url?: string);
    }
}

Cypress.Commands.add('getBySel', (selector, ...options) => {
    return cy.get(`[data-cy=${selector}]`, ...options);
});

Cypress.Commands.add('login', (credentials, url = '') => {
    cy.visit(url, {
        auth: {
            username: credentials.email,
            password: credentials.password
        }
    });
});