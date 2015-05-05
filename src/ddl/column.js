import cloneDeep from 'lodash/lang/cloneDeep'
import {typeMap} from './types'
import {isType, isTypeFactory} from './predicates'

export class Column {

  constructor(columnName, type, props) {
    this.name  = columnName
    this.type  = type
    this.props = cloneDeep(props)
  }

  _setTable(table) {
  	this._table = table
  	return this
  }

  toString() {
  	return this.name
  }

}
Column.prototype['@@__COLUMN__@@'] = true

export function column(columnName, type, props, fn) {
 	if (typeof columnName !== 'string') {
 		throw new TypeError('schema-definition columnName must be a string')
 	}
  if (!isType(type) && !isTypeFactory(type)) {
    throw new TypeError('Type-Definition must be a type constructor or a configured type')
  }
  return new Column(columnName, type, props, fn)
}
