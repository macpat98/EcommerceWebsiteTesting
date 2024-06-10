// © Example Copyright 2024. All Rights Reserved.

import { Users } from '../support/classes/users';
import { UrlPath } from '../support/enums/url-path';

// Arrange
const PRESELECTED_PHRASE = 'electronics';
const RESULTS_COUNT_FORMAT = /\d+/; // One or more repetitions of any digit

describe('Product Search and Filter', () => {
    beforeEach(() => {
        // Act
        cy.log(`***Step 1: Visiting Product Search page: ${Cypress.config().baseUrl}${UrlPath.ProductSearch}***`);
        cy.login(Users.testUser, UrlPath.ProductSearch);
    });

    it(`returns only products related to preselected phrase: ${PRESELECTED_PHRASE}`, () => {
        // Act
        cy.log(`***Step 2: Searching for products related to: ${PRESELECTED_PHRASE}***`);
        cy.getBySel('product-search-input').type(`${PRESELECTED_PHRASE}{enter}`);

        // Assert
        cy.log(`***Step 3: Verifying results header title***`);
        cy.getBySel('search-results-header')
            .contains(RESULTS_COUNT_FORMAT)
            .contains(`"${PRESELECTED_PHRASE}" - Search results`, { matchCase: false });

        cy.log(`***Step 4: Verifying displayed product titles***`);
        cy.getBySel('product-title')
            .each($productTitle => {
                expect($productTitle.text().toLowerCase()).to.contain(PRESELECTED_PHRASE);
            });
    });
});
