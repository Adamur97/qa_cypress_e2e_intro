/// <reference types="cypress" />

import SignInPage from '../pageObjects/SignInPage';
import Header from '../pageObjects/Header';

describe('Sign In', () => {
  // Replace these with your actual test account credentials
  const user = {
    email: 'adamur.ichigo@onet.pl', // correct password for test account
    password: 'dederinka123', // username exists in the app
    username: 'Adamur'
  };

  const signInPage = new SignInPage();
  const header = new Header();

  // Ignore uncaught exceptions from the application
  Cypress.on('uncaught:exception', (err, runnable) => {
    // eslint-disable-next-line no-unused-vars
    const _ = err;
    return false;
  });

  beforeEach(() => {
    cy.visit('https://react-redux.realworld.io/#/login');
    // Backup app if needed:
    // cy.visit('https://conduit.mate.academy/#/login');
  });

  it('should log in successfully and show username in header', () => {
    // Intercept the login API request
    cy.intercept('POST', '**/api/users/login').as('login');

    // Fill in login form and submit
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignIn();

    // Wait for login request to complete
    cy.wait('@login');

    // Assert username appears in the header
    header.getProfileMenu(user.username).should('be.visible');
  });
});
