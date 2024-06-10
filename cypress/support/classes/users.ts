// © Example Copyright 2024. All Rights Reserved.

export abstract class Users {
    public static testUser: Credentials = {
        email: Cypress.env('TEST_USER_EMAIL'),
        password: Cypress.env('TEST_USER_PASSWORD')
    };
}