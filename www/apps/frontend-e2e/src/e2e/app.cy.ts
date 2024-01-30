describe('deployer', () => {

  beforeEach(() => {
    cy.intercept('/api/users').as('getUsers');
    cy.intercept(/\/api\/deployer\/status\?apiUrl=http:\/\/.+/).as('getStatus');
    cy.intercept(/\/api\/deployer\/peers\?apiUrl=http:\/\/.+/).as('getPeers');
    cy.intercept(/\/api\/deployer\/getStateRootHash\?apiUrl=http:\/\/.+/).as('getStateRootHash');
    cy.visit('/');
  });

  it('should call api', () => {
    cy.wait(['@getUsers', '@getStatus', '@getPeers', '@getStateRootHash']);
    cy.contains('Network');
  });

  it('should have prefilled inputs', () => {
    cy.get('input[name="apiUrl"]').invoke('val').should('not.be.empty');
    cy.get('input[name="stateRootHash"]').invoke('val').should('not.be.empty');
    cy.get('input[name="gasFee"]').invoke('val').should('not.be.empty');
  });


  it('should have State root hash results', () => {
    cy.contains('span', 'State root hash');
    cy.get('code').invoke('text').should('not.be.empty');
  });
});
