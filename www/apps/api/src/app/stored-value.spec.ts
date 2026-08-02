import {
  extractEntryPoints,
  extractNamedKeys,
  joinNamedKeyPath,
  normalizeStateKey,
  splitNamedKeyPath,
} from '@casper-api/api-interfaces';

describe('stored-value helpers', () => {
  describe('splitNamedKeyPath / joinNamedKeyPath', () => {
    it('drops empty and trailing-slash segments', () => {
      expect(splitNamedKeyPath('counter/count/')).toEqual(['counter', 'count']);
      expect(splitNamedKeyPath('/a//b/')).toEqual(['a', 'b']);
      expect(splitNamedKeyPath('   ')).toEqual([]);
      expect(splitNamedKeyPath(undefined)).toEqual([]);
    });

    it('joins without producing empty trailing parts', () => {
      expect(joinNamedKeyPath(['counter', '', 'count', ' '])).toBe(
        'counter/count',
      );
    });
  });

  describe('normalizeStateKey', () => {
    it('maps legacy contract- prefixes to hash-', () => {
      expect(normalizeStateKey('  contract-abc  ')).toBe('hash-abc');
      expect(normalizeStateKey('contract-wasm-deadbeef')).toBe('hash-deadbeef');
    });

    it('keeps entity- and account-hash- keys', () => {
      expect(normalizeStateKey('entity-contract-aa')).toBe(
        'entity-contract-aa',
      );
      expect(normalizeStateKey('account-hash-bb')).toBe('account-hash-bb');
    });
  });

  describe('extractNamedKeys', () => {
    it('reads Account and Contract named_keys', () => {
      expect(
        extractNamedKeys({
          Account: { named_keys: [{ name: 'a' }, { name: 'b' }] },
        }).map((k) => k.name),
      ).toEqual(['a', 'b']);

      expect(
        extractNamedKeys({
          Contract: { named_keys: [{ name: 'c' }] },
        }).map((k) => k.name),
      ).toEqual(['c']);
    });

    it('reads AddressableEntity named_keys', () => {
      const keys = extractNamedKeys({
        AddressableEntity: {
          entity: {
            entity: {
              named_keys: [{ name: 'dict' }, { name: 'uref_key' }],
            },
          },
        },
      });
      expect(keys.map((k) => k.name)).toEqual(['dict', 'uref_key']);
    });
  });

  describe('extractEntryPoints', () => {
    it('reads Contract and Entity entry points', () => {
      expect(
        extractEntryPoints({
          Contract: { entry_points: [{ name: 'call' }] },
        }).map((e) => e.name),
      ).toEqual(['call']);

      expect(
        extractEntryPoints({
          AddressableEntity: {
            entity: {
              entity: {
                entry_points: [{ name: 'transfer' }, { name: 'mint' }],
              },
            },
          },
        }).map((e) => e.name),
      ).toEqual(['transfer', 'mint']);
    });
  });
});
