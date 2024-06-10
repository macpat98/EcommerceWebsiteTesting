// © Example Copyright 2024. All Rights Reserved.

import { Users } from '../support/classes/users';
import { UrlPath } from '../support/enums/url-path';

describe('Adding items to cart', () => {
    beforeEach(() => {
        // Arrange
        const preselectedProductUrl = `${UrlPath.Item}/iphone-5-10243252`;

        // Act
        cy.log(`***Step 1: Visiting preselected product page: ${preselectedProductUrl}***`);
        cy.login(Users.testUser, preselectedProductUrl);
    });

    it('updates contents of the cart with the selected item', () => {
        // Act
        cy.log('***Step 2: Adding product to a cart***');
        cy.getBySel('add-to-cart-button')
            .should('be.enabled')
            .click();

        // Assert
        cy.log('***Step 3: Verifying modal window for added product***');
        cy.getBySel('added-modal-window').within(() => {
            cy.getBySel('modal-text').contains('Product added to cart!');
            cy.getBySel('continue-shopping-button').click(); // Close modal window
        });

        // Assert
        cy.log('***Step 4: Verifying if cart icon contains expected items count***');
        const expectedItemsCount = 1;
        cy.getBySel('top-bar-item-cart-icon')
            .invoke('text')
            .should('eq', `Cart (${expectedItemsCount})`);

        // Act
        cy.log('***Step 5: Visiting cart page***');
        cy.visit(UrlPath.Cart);

        // Assert
        cy.log('***Step 6: Verifying if cart was updated***');
        cy.getBySel('cart-items-table')
            .find('tr')
            .should('have.length', expectedItemsCount)
            .and('contain.text', 'Iphone 5');
    });
});