import {isDatabase} from './predicates'

class Table {

  constructor(tableName, columns, fn) {
    this.name    = tableName
    this.columns = columns
    this.fn      = fn
  }

  _setDatabase(database) {
    if (!isDatabase(database)) {
      throw new Error('A valid database object must be passed to Table#_setDatabase')
    }
    this.database = database
    return this
  }

}

function table(tableName, columns, fn) {
  return new Table(tableName, columns, fn)
}
