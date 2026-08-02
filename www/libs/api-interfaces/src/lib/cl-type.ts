/** Local CLType helpers — removed from casper-rust-wasm-sdk 2.2.2; kept for arg UI. */

export enum CLTypeEnum {
  Bool = 0,
  I32 = 1,
  I64 = 2,
  U8 = 3,
  U32 = 4,
  U64 = 5,
  U128 = 6,
  U256 = 7,
  U512 = 8,
  Unit = 9,
  String = 10,
  Key = 11,
  URef = 12,
  PublicKey = 13,
  Option = 14,
  List = 15,
  ByteArray = 16,
  Result = 17,
  Map = 18,
  Tuple1 = 19,
  Tuple2 = 20,
  Tuple3 = 21,
  Any = 22,
}

export class CLType {
  private constructor(private readonly label: string) {}

  toString(): string {
    return this.label;
  }

  static Bool(): CLType {
    return new CLType('Bool');
  }
  static I32(): CLType {
    return new CLType('I32');
  }
  static I64(): CLType {
    return new CLType('I64');
  }
  static U8(): CLType {
    return new CLType('U8');
  }
  static U32(): CLType {
    return new CLType('U32');
  }
  static U64(): CLType {
    return new CLType('U64');
  }
  static U128(): CLType {
    return new CLType('U128');
  }
  static U256(): CLType {
    return new CLType('U256');
  }
  static U512(): CLType {
    return new CLType('U512');
  }
  static Unit(): CLType {
    return new CLType('Unit');
  }
  static String(): CLType {
    return new CLType('String');
  }
  static Key(): CLType {
    return new CLType('Key');
  }
  static URef(): CLType {
    return new CLType('URef');
  }
  static PublicKey(): CLType {
    return new CLType('PublicKey');
  }
  static Any(): CLType {
    return new CLType('Any');
  }
  static ByteArray(): CLType {
    return new CLType('ByteArray');
  }
  static Option(inner: CLType): CLType {
    return new CLType(`Option(${inner})`);
  }
  static List(inner: CLType): CLType {
    return new CLType(`List(${inner})`);
  }
  static Result(ok: CLType, err: CLType): CLType {
    return new CLType(`Result(${ok}, ${err})`);
  }
  static Map(key: CLType, value: CLType): CLType {
    return new CLType(`Map(${key}, ${value})`);
  }
  static Tuple1(a: CLType): CLType {
    return new CLType(`Tuple1(${a})`);
  }
  static Tuple2(a: CLType, b: CLType): CLType {
    return new CLType(`Tuple2(${a}, ${b})`);
  }
  static Tuple3(a: CLType, b: CLType, c: CLType): CLType {
    return new CLType(`Tuple3(${a}, ${b}, ${c})`);
  }
}
