describe('deployer', () => {
  const stateRootHash =
    '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

  beforeEach(() => {
    // Fully stub API so CI does not need Nest or a live Casper node
    cy.intercept('GET', '/api/users', { body: [] }).as('getUsers');
    cy.intercept('GET', /\/api\/deployer\/status.*/, {
      body: JSON.stringify('status'),
    }).as('getStatus');
    cy.intercept('GET', /\/api\/deployer\/peers.*/, {
      body: [
        { node_id: 'n1', address: 'http://localhost:11101' },
        { node_id: 'n2', address: 'http://localhost:11102' },
      ],
    }).as('getPeers');
    cy.intercept('GET', /\/api\/deployer\/getStateRootHash.*/, {
      body: JSON.stringify(stateRootHash),
    }).as('getStateRootHash');
    cy.intercept('GET', /\/api\/deployer\/balanceOfByPublicKey.*/, {
      body: JSON.stringify('0'),
    });
    cy.intercept('GET', /\/api\/deployer\/state.*/, {
      body: {
        AddressableEntity: {
          entity: {
            entity: {
              named_keys: [{ name: 'counter' }, { name: 'count' }],
              entry_points: [{ name: 'call' }],
            },
          },
        },
      },
    }).as('getState');

    cy.visit('/');
  });

  it('should call api on load', () => {
    cy.wait(['@getUsers', '@getPeers']);
    cy.wait(['@getStatus', '@getStateRootHash'], { timeout: 20000 });
    cy.contains('Network');
  });

  it('should have network presets without launcher 7777', () => {
    cy.get('input[name="apiUrl"]').invoke('val').should('not.be.empty');
    cy.get('select')
      .first()
      .find('option')
      .then(($opts) => {
        const texts = [...$opts].map((o) => o.textContent || '');
        expect(
          texts.some(
            (t) =>
              t.includes('11101') ||
              t.includes('testnet') ||
              t.includes('mainnet'),
          ),
        ).to.eq(true);
        expect(texts.some((t) => t.includes(':7777'))).to.eq(false);
      });
  });

  it('should show Transaction UI (not Deploy-only)', () => {
    cy.contains('h2.title', 'Transaction');
    cy.contains('button', 'Make transaction');
    cy.contains('button', 'Sign only');
    cy.contains('button', 'Sign & Send');
  });

  it('should have prefilled gas / TTL inputs', () => {
    cy.get('input[name="gasFee"]').invoke('val').should('not.be.empty');
  });

  it('should render state root hash result', () => {
    cy.contains('span', 'State root hash');
    cy.get('code').invoke('text').should('contain', stateRootHash.slice(0, 8));
  });
});
