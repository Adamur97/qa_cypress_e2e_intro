export default class SignInPage {
  get emailField() {
    return cy.get('input[type="email"]');
  }

  get passwordField() {
    return cy.get('input[type="password"]');
  }

  get signInBtn() {
    return cy.get('button[type="submit"]');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignIn() {
    this.signInBtn.click();
  }
}
