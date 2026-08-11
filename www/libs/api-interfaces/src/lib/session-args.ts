/** Session args JSON helpers for the Args builder (casper-client session_args_json shape). */

import { CLType } from './cl-type';
import { NamedCLTypeArg } from './api-interfaces';

/** One entry in session_args_json / ceps ArgField type field. */
export type SessionArgType = string | Record<string, unknown>;

/** Parsed runtime arg row. */
export type SessionArgRow = {
  name: string;
  type: SessionArgType;
  value?: unknown;
};

/** ceps-client schema ArgField. */
export type CepArgField = {
  name: string;
  type: SessionArgType;
  optional?: boolean;
};

/** Full CEP schema from schemaJson(). */
export type CepSchema = {
  cep: string;
  install: CepArgField[];
  entrypoints: Record<string, CepArgField[]>;
};

/** Parse session_args_json; empty / invalid → []. */
export function parseSessionArgsJson(json: string | null | undefined): SessionArgRow[] {
  if (!json || !String(json).trim()) {
    return [];
  }
  try {
    const parsed = JSON.parse(String(json).trim()) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    const rows: SessionArgRow[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== 'object') {
        continue;
      }
      const name = (item as { name?: unknown }).name;
      const type = (item as { type?: unknown }).type;
      if (typeof name !== 'string' || name.length === 0 || type === undefined) {
        continue;
      }
      rows.push({
        name,
        type: type as SessionArgType,
        value: (item as { value?: unknown }).value,
      });
    }
    return rows;
  } catch {
    return [];
  }
}

/** Serialize rows to session_args_json. Omits rows with empty name or undefined value. */
export function serializeSessionArgsJson(rows: SessionArgRow[]): string {
  const out = rows
    .filter((r) => r.name && r.value !== undefined && r.value !== '')
    .map((r) => ({
      name: r.name,
      type: r.type,
      value: r.value,
    }));
  return JSON.stringify(out);
}

/** RPC / Parameter cl_type → session_args_json type field. */
export function clTypeToSessionType(clType: unknown): SessionArgType {
  if (clType === null || clType === undefined) {
    return 'Any';
  }
  if (typeof clType === 'string') {
    return clType;
  }
  if (typeof clType === 'object') {
    const obj = clType as Record<string, unknown>;
    if ('Option' in obj) {
      return { Option: clTypeToSessionType(obj['Option']) };
    }
    if ('List' in obj) {
      return { List: clTypeToSessionType(obj['List']) };
    }
    if ('ByteArray' in obj) {
      return { ByteArray: obj['ByteArray'] as number };
    }
    if ('Result' in obj) {
      const result = obj['Result'] as { ok?: unknown; err?: unknown } | unknown[];
      if (Array.isArray(result) && result.length >= 2) {
        return {
          Result: {
            ok: clTypeToSessionType(result[0]),
            err: clTypeToSessionType(result[1]),
          },
        };
      }
      const r = result as { ok?: unknown; err?: unknown };
      return {
        Result: {
          ok: clTypeToSessionType(r.ok),
          err: clTypeToSessionType(r.err),
        },
      };
    }
    if ('Map' in obj) {
      const map = obj['Map'] as { key?: unknown; value?: unknown } | unknown[];
      if (Array.isArray(map) && map.length >= 2) {
        return {
          Map: {
            key: clTypeToSessionType(map[0]),
            value: clTypeToSessionType(map[1]),
          },
        };
      }
      const m = map as { key?: unknown; value?: unknown };
      return {
        Map: {
          key: clTypeToSessionType(m.key),
          value: clTypeToSessionType(m.value),
        },
      };
    }
    if ('Tuple1' in obj) {
      const t = obj['Tuple1'];
      const inner = Array.isArray(t) ? t[0] : t;
      return { Tuple1: [clTypeToSessionType(inner)] };
    }
    if ('Tuple2' in obj) {
      const t = obj['Tuple2'] as unknown[];
      return {
        Tuple2: [clTypeToSessionType(t?.[0]), clTypeToSessionType(t?.[1])],
      };
    }
    if ('Tuple3' in obj) {
      const t = obj['Tuple3'] as unknown[];
      return {
        Tuple3: [
          clTypeToSessionType(t?.[0]),
          clTypeToSessionType(t?.[1]),
          clTypeToSessionType(t?.[2]),
        ],
      };
    }
  }
  if (clType instanceof CLType || (clType as { toString?: () => string }).toString) {
    return sessionTypeFromClTypeLabel(String(clType));
  }
  return 'Any';
}

/** Best-effort parse of CLType.toString() labels into session type. */
function sessionTypeFromClTypeLabel(label: string): SessionArgType {
  const trimmed = label.trim();
  const option = /^Option\((.*)\)$/.exec(trimmed);
  if (option) {
    return { Option: sessionTypeFromClTypeLabel(option[1]) };
  }
  const list = /^List\((.*)\)$/.exec(trimmed);
  if (list) {
    return { List: sessionTypeFromClTypeLabel(list[1]) };
  }
  const map = /^Map\((.*), (.*)\)$/.exec(trimmed);
  if (map) {
    return {
      Map: {
        key: sessionTypeFromClTypeLabel(map[1]),
        value: sessionTypeFromClTypeLabel(map[2]),
      },
    };
  }
  const tuple1 = /^Tuple1\((.*)\)$/.exec(trimmed);
  if (tuple1) {
    return { Tuple1: [sessionTypeFromClTypeLabel(tuple1[1])] };
  }
  const tuple2 = /^Tuple2\((.*), (.*)\)$/.exec(trimmed);
  if (tuple2) {
    return {
      Tuple2: [
        sessionTypeFromClTypeLabel(tuple2[1]),
        sessionTypeFromClTypeLabel(tuple2[2]),
      ],
    };
  }
  const tuple3 = /^Tuple3\((.*), (.*), (.*)\)$/.exec(trimmed);
  if (tuple3) {
    return {
      Tuple3: [
        sessionTypeFromClTypeLabel(tuple3[1]),
        sessionTypeFromClTypeLabel(tuple3[2]),
        sessionTypeFromClTypeLabel(tuple3[3]),
      ],
    };
  }
  const result = /^Result\((.*), (.*)\)$/.exec(trimmed);
  if (result) {
    return {
      Result: {
        ok: sessionTypeFromClTypeLabel(result[1]),
        err: sessionTypeFromClTypeLabel(result[2]),
      },
    };
  }
  return trimmed || 'Any';
}

/** Build a CLType for the argument select from a session type. */
export function sessionTypeToClType(type: SessionArgType): CLType {
  if (typeof type === 'string') {
    switch (type) {
      case 'Bool':
        return CLType.Bool();
      case 'I32':
        return CLType.I32();
      case 'I64':
        return CLType.I64();
      case 'U8':
        return CLType.U8();
      case 'U32':
        return CLType.U32();
      case 'U64':
        return CLType.U64();
      case 'U128':
        return CLType.U128();
      case 'U256':
        return CLType.U256();
      case 'U512':
        return CLType.U512();
      case 'Unit':
        return CLType.Unit();
      case 'String':
        return CLType.String();
      case 'Key':
        return CLType.Key();
      case 'URef':
        return CLType.URef();
      case 'PublicKey':
        return CLType.PublicKey();
      case 'ByteArray':
        return CLType.ByteArray();
      case 'Any':
        return CLType.Any();
      default:
        return CLType.Any();
    }
  }
  if (type && typeof type === 'object') {
    if ('Option' in type) {
      return CLType.Option(sessionTypeToClType(type['Option'] as SessionArgType));
    }
    if ('List' in type) {
      return CLType.List(sessionTypeToClType(type['List'] as SessionArgType));
    }
    if ('ByteArray' in type) {
      return CLType.ByteArray();
    }
    if ('Map' in type) {
      const map = type['Map'] as { key: SessionArgType; value: SessionArgType };
      return CLType.Map(
        sessionTypeToClType(map.key),
        sessionTypeToClType(map.value),
      );
    }
    if ('Result' in type) {
      const result = type['Result'] as {
        ok: SessionArgType;
        err: SessionArgType;
      };
      return CLType.Result(
        sessionTypeToClType(result.ok),
        sessionTypeToClType(result.err),
      );
    }
    if ('Tuple1' in type) {
      const t = type['Tuple1'] as SessionArgType[];
      return CLType.Tuple1(sessionTypeToClType(t[0]));
    }
    if ('Tuple2' in type) {
      const t = type['Tuple2'] as SessionArgType[];
      return CLType.Tuple2(
        sessionTypeToClType(t[0]),
        sessionTypeToClType(t[1]),
      );
    }
    if ('Tuple3' in type) {
      const t = type['Tuple3'] as SessionArgType[];
      return CLType.Tuple3(
        sessionTypeToClType(t[0]),
        sessionTypeToClType(t[1]),
        sessionTypeToClType(t[2]),
      );
    }
  }
  return CLType.Any();
}

/** On-chain Parameter-like → NamedCLTypeArg for storage / Custom tab. */
export function parameterToNamedArg(param: {
  name?: string;
  cl_type?: unknown;
}): NamedCLTypeArg | null {
  if (!param?.name || typeof param.name !== 'string') {
    return null;
  }
  const sessionType = clTypeToSessionType(param.cl_type);
  return {
    name: param.name,
    cl_type: sessionTypeToClType(sessionType),
    session_type: sessionType,
  };
}

/** ceps ArgField → NamedCLTypeArg. */
export function cepFieldToNamedArg(field: CepArgField): NamedCLTypeArg {
  return {
    name: field.name,
    cl_type: sessionTypeToClType(field.type),
    session_type: field.type,
    optional: !!field.optional,
  };
}

/** Normalize any schema-like row into NamedCLTypeArg. */
export function toNamedArg(raw: unknown): NamedCLTypeArg | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const obj = raw as Record<string, unknown>;
  if (typeof obj['name'] !== 'string' || !obj['name']) {
    return null;
  }
  if ('type' in obj && !('cl_type' in obj)) {
    return cepFieldToNamedArg(obj as unknown as CepArgField);
  }
  if ('cl_type' in obj) {
    const cl = obj['cl_type'];
    if (cl instanceof CLType) {
      return {
        name: obj['name'] as string,
        cl_type: cl,
        session_type:
          (obj['session_type'] as SessionArgType | undefined) ??
          clTypeToSessionType(String(cl)),
        optional: !!obj['optional'],
        value: obj['value'],
      };
    }
    const sessionType =
      (obj['session_type'] as SessionArgType | undefined) ??
      clTypeToSessionType(cl);
    return {
      name: obj['name'] as string,
      cl_type: sessionTypeToClType(sessionType),
      session_type: sessionType,
      optional: !!obj['optional'],
      value: obj['value'],
    };
  }
  return null;
}

/**
 * Merge schema (names/types) with existing JSON values by name.
 * Schema types win; values come from the JSON rows when present.
 */
export function mergeSchemaWithValues(
  schema: unknown[],
  values: SessionArgRow[],
): NamedCLTypeArg[] {
  const byName = new Map(values.map((v) => [v.name, v]));
  const rows: NamedCLTypeArg[] = [];
  for (const raw of schema) {
    const row = toNamedArg(raw);
    if (!row) {
      continue;
    }
    const existing = byName.get(row.name);
    if (existing && existing.value !== undefined) {
      rows.push({ ...row, value: existing.value });
    } else {
      rows.push(row);
    }
  }
  return rows;
}

/** Coerce a form value for session_args_json based on session type. */
export function coerceSessionValue(
  type: SessionArgType,
  raw: string,
): unknown {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return undefined;
  }
  if (typeof type === 'string') {
    switch (type) {
      case 'Bool':
        return trimmed.toLowerCase() === 'true';
      case 'I32':
      case 'I64':
      case 'U8':
      case 'U32':
      case 'U64': {
        const n = Number(trimmed);
        return Number.isFinite(n) ? n : trimmed;
      }
      case 'U128':
      case 'U256':
      case 'U512':
        return trimmed;
      case 'Unit':
        return null;
      default:
        return trimmed;
    }
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

/** NamedCLTypeArg list → SessionArgRow list for serialize. */
export function namedArgsToSessionRows(args: NamedCLTypeArg[]): SessionArgRow[] {
  return args
    .filter((a) => a.name && a.value !== undefined && a.value !== '')
    .map((a) => ({
      name: a.name,
      type: a.session_type ?? clTypeToSessionType(a.cl_type),
      value: a.value,
    }));
}
