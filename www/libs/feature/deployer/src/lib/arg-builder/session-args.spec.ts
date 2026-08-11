import {
  parseSessionArgsJson,
  serializeSessionArgsJson,
  clTypeToSessionType,
  mergeSchemaWithValues,
  sessionTypeToClType,
  parameterToNamedArg,
  coerceSessionValue,
} from '@casper-api/api-interfaces';
import { CLType } from '@casper-api/api-interfaces';

describe('session-args helpers', () => {
  it('parses and serializes session_args_json', () => {
    const json =
      '[{"name":"amount","type":"U256","value":"1000"},{"name":"owner","type":"Key","value":"account-hash-ab"}]';
    const rows = parseSessionArgsJson(json);
    expect(rows).toHaveLength(2);
    expect(rows[0].name).toBe('amount');
    expect(rows[0].type).toBe('U256');
    expect(serializeSessionArgsJson(rows)).toContain('U256');
  });

  it('returns [] for invalid json', () => {
    expect(parseSessionArgsJson('')).toEqual([]);
    expect(parseSessionArgsJson('not-json')).toEqual([]);
    expect(parseSessionArgsJson('{}')).toEqual([]);
  });

  it('maps nested List CLTypes', () => {
    expect(clTypeToSessionType({ List: 'Key' })).toEqual({ List: 'Key' });
    expect(clTypeToSessionType({ List: { Tuple2: ['String', 'String'] } })).toEqual({
      List: { Tuple2: ['String', 'String'] },
    });
    const cl = sessionTypeToClType({ List: 'U256' });
    expect(cl.toString()).toContain('List');
  });

  it('merges schema with values by name', () => {
    const merged = mergeSchemaWithValues(
      [
        { name: 'name', type: 'String', optional: false },
        { name: 'decimals', type: 'U8', optional: false },
      ],
      [{ name: 'name', type: 'String', value: 'TOKEN' }],
    );
    expect(merged[0].value).toBe('TOKEN');
    expect(merged[0].session_type).toBe('String');
    expect(merged[1].value).toBeUndefined();
    expect(merged[1].cl_type.toString()).toBe(CLType.U8().toString());
  });

  it('normalizes on-chain parameters', () => {
    const arg = parameterToNamedArg({
      name: 'recipient',
      cl_type: 'Key',
    });
    expect(arg?.name).toBe('recipient');
    expect(arg?.session_type).toBe('Key');
  });

  it('keeps U256 as string', () => {
    expect(coerceSessionValue('U256', '1000000000000000000')).toBe(
      '1000000000000000000',
    );
    expect(coerceSessionValue('U8', '9')).toBe(9);
    expect(coerceSessionValue('Bool', 'true')).toBe(true);
  });

  it('parses Map nested type objects', () => {
    const type = clTypeToSessionType({
      Map: { key: 'String', value: 'String' },
    });
    expect(type).toEqual({ Map: { key: 'String', value: 'String' } });
  });
});
