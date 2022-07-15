const createTokenSet = ({ name }) => {
  cy.get('[data-cy="button-new-token-set"]').click({ timeout: 1000 })
      .get('[data-cy="token-set-input"]')
      .type(name).type('{enter}');
};

describe('TokenListing', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage');
      },
    });
    cy.waitForReact(1000);
  });

  it('create token set', () => {
    cy.receiveSetTokens({
      version: '5',
      values: {
        options: [{
          name: 'sizing.xs',
          value: 4,
          type: 'sizing'
        }],
        global: [{
          name: 'sizing.xs',
          value: 4,
          type: 'sizing'
        }],
      },
    });
    cy.receiveStorageTypeLocal();
    
    createTokenSet({ name: 'token-source' });
    createTokenSet({ name: 'token-enabled' });
    createTokenSet({ name: 'token-disabled' });
  });
  
  it('Can create a new theme & select theme', () => {
    cy.receiveSetTokens({
      version: '5',
      values: {
        options: [{
          name: 'sizing.xs',
          value: 4,
          type: 'sizing'
        }],
        global: [{
          name: 'sizing.xs',
          value: 4,
          type: 'sizing'
        }],
      },
    });
    cy.receiveStorageTypeLocal();

    createTokenSet({ name: 'token-source' });
    createTokenSet({ name: 'token-enabled' });
    createTokenSet({ name: 'token-disabled' });

    cy.get('[data-cy="themeselector-dropdown"]').click();
    cy.get('[data-cy="themeselector-managethemes"]').click();
    cy.get('[data-cy="button-manage-themes-modal-new-theme"]').click();
    cy.get('[data-cy="create-or-edit-theme-form--input--name"]').type('My first theme');
    cy.get('[data-cy="tokensettheme-item--dropdown-trigger--token-source-set"]').click();
    cy.get('[data-cy="tokensettheme-item--dropdown-content--source"]').click();
    cy.get('[data-cy="tokensettheme-item--dropdown-trigger--token-enabled-set"]').click();
    cy.get('[data-cy="tokensettheme-item--dropdown-content--enabled"]').click();
    cy.get('[data-cy="tokensettheme-item--dropdown-trigger--token-disabled-set"]').click();
    cy.get('[data-cy="tokensettheme-item--dropdown-content--disabled"]').click();
    cy.get('[data-cy="button-manage-themes-modal-save-theme"]').click();
    cy.get('[data-cy="close-button"]').click();
    createTokenSet({ name: 'token-extra' });

    cy.get('[data-cy="themeselector-dropdown"]').click();
    cy.contains('My first theme').click();
    cy.get('[data-state="indeterminate"]').should('have.length', 2);
    cy.get('[data-state="checked"]').should('have.length', 2);
    cy.get('[data-state="unchecked"]').should('have.length', 4);
  });
});
