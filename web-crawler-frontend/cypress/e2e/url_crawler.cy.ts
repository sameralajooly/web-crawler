/// <reference types="cypress" />

describe("URL Crawler Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  // Keep clicking "Next" until the button is disabled
  const goToLastPage = () => {
    cy.get('button[name="next-page"]').then(($btn) => {
      if (!$btn.is(":disabled")) {
        cy.wrap($btn).click();
        cy.wait(300);
        goToLastPage();
      }
    });
  };

  it("should allow the user to input and submit a URL", () => {
    //Using a domain that doesn't exist so that the url shows in the table not the title
    const testUrl = "https://exampleThatDoesnotExist.com";

    cy.get('input[id="url"]').type(testUrl);
    cy.get('button[name="crawl-btn"]').click();

    goToLastPage();

    cy.contains(testUrl).should("be.visible");
  });
  it("selects checkbox in last row and clicks delete", () => {
    cy.get("table tbody tr")
      .last()
      .find('input[type="checkbox"]')
      .invoke("attr", "id")
      .then((checkboxId) => {
        cy.get(`#${checkboxId}`).check({ force: true });
        cy.get('button[name="delete-btn"]').click();

        cy.get(`#${checkboxId}`).should("not.exist");
      });
  });
});
