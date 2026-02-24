describe("Ecommerce App Test", () => {

  it("Loads Home Page", () => {
    cy.visit("/");
    cy.contains("Products");
  });

  it("Navigates to Product Detail Page", () => {
    cy.visit("/");
    cy.contains("View Details").first().click();
  });

  it("Adds product to cart", () => {
    cy.visit("/");
    cy.contains("View Details").first().click();
    cy.contains("Add to Cart").click();
    cy.contains("Cart").click();
    cy.contains("Total Items");
  });

  it("Filter works correctly", () => {
  cy.visit("http://localhost:3000/");
  cy.get('input[type="checkbox"]').first().check();
  cy.url().should("include", "category");
});

});