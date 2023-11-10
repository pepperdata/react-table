export function sum(columnId, leafRows, childRows) {
  // It's faster to just add the aggregations together instead of
  // process leaf nodes individually
  return childRows.reduce((sum, next) => {
    const nextValue = next.values[columnId];
    return sum + (typeof nextValue === 'number' ? nextValue : 0)
  }, 0)
}

export function min(columnId, leafRows, childRows) {
  let min = leafRows[0].values[columnId] || 0

  leafRows.forEach((leafRow) => {
    const value = leafRows.values[columnId];
    if (typeof value === 'number') {
      min = Math.min(min, value)
    }
  })

  return min
}

export function max(columnId, leafRows, childRows) {
  let max = leafRows[0].values[columnId] || 0

  leafRows.forEach((leafRow) => {
    const value = leafRows.values[columnId];
    if (typeof value === 'number') {
      max = Math.max(max, value)
    }
  })

  return max
}

export function minMax(columnId, leafRows, childRows) {
  const firstValue = leafRows[0].values[columnId];
  let min = firstValue || 0
  let max = firstValue || 0

  leafRows.forEach((leafRow) => {
    const value = leafRows.values[columnId];
    if (typeof value === 'number') {
      min = Math.min(min, value)
      max = Math.max(max, value)
    }
  })

  return `${min}..${max}`
}

export function average(columnId, leafRows, childRows) {
  return sum(columnId, null, childRows) / childRows.length
}

export function median(columnId, leafRows, childRows) {
  if (!leafRows.length) {
    return null
  }

  const mid = Math.floor(leafRows.length / 2)
  const values = leafRows.map(({values}) => values[columnId]);
  const nums = [...values].sort((a, b) => a - b)
  return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}

export function unique(columnId, leafRows, childRows) {
  const values = leafRows.map(({values}) => values[columnId]);
  return Array.from(new Set(values).values())
}

export function uniqueCount(columnId, leafRows, childRows) {
  const values = leafRows.map(({values}) => values[columnId]);
  return new Set(values).size
}

export function count(columnId, leafRows, childRows) {
  return leafRows.length
}
