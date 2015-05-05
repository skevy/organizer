import Type from './type'

class Type_Increments extends Type {}

Type.prototype.type = 'INCREMENTS'

class Type_BigIncrements extends Type {}

Type.prototype.type = 'BIGINCREMENTS'

class Type_String extends Type {}

Type.prototype.type = 'STRING'

class Type_Varchar extends Type {}

Type.prototype.type = 'VARCHAR'

class Type_Char extends Type {}

Type.prototype.type = 'CHAR'

class Type_DateTime extends Type {}

Type.prototype.type = 'DATETIME'

class Type_Date extends Type {}

Type.prototype.type = 'DATE'

class Type_Timestamp extends Type {}

Type.prototype.type = 'TIMESTAMP'

class Type_Integer extends Type {}

Type.prototype.type = 'INTEGER'

class Type_BigInteger extends Type {}

Type.prototype.type = 'BIGINTEGER'

class Type_Text extends Type {}

Type.prototype.type = 'TEXT'

class Type_Float extends Type {}

Type.prototype.type = 'FLOAT'

class Type_Decimal extends Type {}

Type.prototype.type = 'DECIMAL'

class Type_Boolean extends Type {}

Type.prototype.type = 'BOOLEAN'

class Type_Time extends Type {}

Type.prototype.type = 'TIME'

class Type_Binary extends Type {}

Type.prototype.type = 'BINARY'

class Type_Enum extends Type {}

Type.prototype.type = 'ENUM'

class Type_JSON extends Type {}

Type.prototype.type = 'JSON'

class Type_UUID extends Type {}

Type.prototype.type = 'UUID'

function warnAlias(type, Ctor) {
  var ctor = new Ctor()
  return ctor;
}

export default {
  increments:    makeType(Type_Increments),
  bigIncrements: makeType(Type_BigIncrements),
  string:        makeType(Type_String),
  varchar:       makeType(Type_Varchar),
  char:          makeType(Type_Varchar),
  dateTime:      makeType(Type_DateTime),
  date:          makeType(Type_Date),
  timestamp:     makeType(Type_Timestamp),
  int:           makeType(Type_Integer),
  integer:       makeType(Type_Integer),
  bigInt:        makeType(Type_BigInteger),
  bigInteger:    makeType(Type_BigInteger),
  text:          makeType(Type_Text),
  float:         makeType(Type_Float),
  decimal:       makeType(Type_Decimal),
  boolean:       makeType(Type_Boolean),
  time:          makeType(Type_Time),
  binary:        makeType(Type_Binary),
  enum:          makeType(Type_Enum),
  enu:           makeType(Type_Enum),
  json:          makeType(Type_JSON),
  uuid:          makeType(Type_UUID)
}

function makeType(Ctor) {
  function typeCtor(props) {
    return new Ctor(props)
  }
  typeCtor['@@__TYPE_FACTORY__@@'] = true
  return typeCtor
}
