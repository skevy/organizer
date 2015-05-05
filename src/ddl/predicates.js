
export function isTable(obj) {
  return obj && obj['@@__TABLE__@@']
}

export function isColumn(obj) {
  return obj && obj['@@__COLUMN__@@']
}

export function isDatabase(obj) {
  return obj && obj['@@__DATABASE__@@']
}

export function isOptions(obj) {
  return obj && obj['@@__OPTIONS__@@']
}