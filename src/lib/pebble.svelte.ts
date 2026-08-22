
// left, up, down, right
export type Rule = [number, number, number, number]
export type Grid<T> = T[][]
export type Coord = [number, number]
export type Filter = (pebbles: number) => boolean

function build_grid(s: number): Grid<number> {
  return Array.from(
    { length: s }, () => Array.from(
      { length: s }, () => 0
    )
  )
}

function build_rules(s: number): Grid<Rule[]> {
  return Array.from(
    { length: s }, () => Array.from(
      { length: s }, () => Array.from(
        { length: 100 }, () => [0, 0, 0, 0]
      )
    )
  )
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max)
}

export function rule_is_empty(r: Rule): boolean {
  return rule_sum(r) == 0
}
export function rule_sum([l, u, d, r]: Rule): number {
  return (l + u + d + r)
}

export class Pebble {
  grid: Grid<number> = $state([])
  buffer: Grid<number> = []
  rules: Grid<Rule[]> = $state([])

  size = $state(0)

  // history = [] // TODO

  constructor(s: number) {
    this.size = s

    this.grid = build_grid(10)
    this.buffer = build_grid(10)

    this.rules = build_rules(10)
  }

  step = () => {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {

        const pebbles = this.grid[x][y]
        const rule = this.rules[x][y]

        const [l, u, d, r] = rule[pebbles]
        const total = l + u + d + r

        if (total == 0) continue

        if (total > pebbles) {
          alert(`Grid ${x},${y} cannot apply rule ${pebbles} as it requires ${total} pebbles (${pebbles} < ${total})`)
          return
        }

        const clamped = [
          [Math.max(0, x - 1), y],
          [x, Math.max(0, y - 1)],
          [x, Math.min(this.size - 1, y + 1)],
          [Math.min(this.size - 1, x + 1), y]
        ]

        for (let i = 0; i < 4; i++) {
          const [clamped_x, clamped_y] = clamped[i]
          this.buffer[clamped_x][clamped_y] += rule[pebbles][i]
        }

        this.buffer[x][y] = -total
      }
    }

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        this.grid[x][y] += this.buffer[x][y]
        this.buffer[x][y] = 0
      }
    }
  }

  set_pebbles([x,y]: Coord, pebbles: number) {
    this.grid[x][y] = Math.max(pebbles, 0)
  }

  update_pebbles([x,y]: Coord, amount: number) {
    this.grid[x][y] = Math.max(this.grid[x][y] + amount, 0)
  }

  set_rule([x, y]: Coord, i: number, rule: Rule) {
    // TODO validate rule?
    this.rules[x][y][i] = rule
  }

  // TODO
  // set_rule_range([x, y]: Coord, range: Filter, result: RuleBody) {
  //   for (let p = 0; p < 100; p++) {
  //     if (range(p)) this.rules[x][y][p] = result
  //   }
  // }
}

