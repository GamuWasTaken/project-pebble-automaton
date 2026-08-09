
export enum GridAppearance {
  Numbers = "Numbers",
  Dots = "Dots"
}

// left, up, down, right
export type RuleBody = [number, number, number, number]
export type Rule = RuleBody[]
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

function build_rules(s: number): Grid<Rule> {
  return Array.from(
    { length: s }, () => Array.from(
      { length: s }, () => Array.from(
        { length: 100 }, () => [0, 0, 0, 0]
      )
    )
  )
}

function copy_grid<T>(from: Grid<T>, to: Grid<T>) {
  const min = Math.min(from.length, to.length)
  for (let x = 0; x < min; x++) {
    for (let y = 0; y < min; y++) {
      to[x][y] = from[x][y]
    }
  }
}

export function rule_is_empty([l, u, d, r]: RuleBody): boolean {
  return (l + u + d + r) == 0
}

export class PebbleAutomaton {
  grid: Grid<number> = $state([])
  buffer: Grid<number> = []
  rules: Grid<Rule> = $state([])

  #size = $state(0)
  get size() {
    return this.#size
  }
  set size(v) {
    this.#size = v
  }

  appearance = $state(GridAppearance.Numbers)

  // history = [] // TODO

  constructor(s: number) {
    this.#size = s

    this.grid = build_grid(10)
    this.buffer = build_grid(10)

    this.rules = build_rules(10)

  }

  step() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {

        const pebbles = this.grid[x][y]
        const rule = this.rules[x][y]

        const [l, u, d, r] = rule[pebbles]
        const total = l + u + d + r

        if(total == 0) continue

        if (total > pebbles) {
          alert(`Grid ${x},${y} cannot apply rule ${pebbles} as it requires ${total} pebbles (${pebbles} < ${total})`)
          return
        }

        { // left_cell
          const [clamped_x, clamped_y] = [Math.max(0, x - 1), y]
          this.buffer[clamped_x][clamped_y] = l
        }
        { // up_cell
          const [clamped_x, clamped_y] = [x, Math.max(0, y - 1)]
          this.buffer[clamped_x][clamped_y] = u
        }
        { // down_cell
          const [clamped_x, clamped_y] = [x, Math.min(this.size - 1, y + 1)]
          this.buffer[clamped_x][clamped_y] = d
        }
        { // right_cell
          const [clamped_x, clamped_y] = [Math.min(this.size - 1, x + 1), y]
          this.buffer[clamped_x][clamped_y] = r
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

  set_pebbles([x, y]: Coord, pebbles: number) {
    this.grid[x][y] = pebbles
  }

  set_rule_constant([x, y]: Coord, pebbles: number, result: RuleBody) {
    this.rules[x][y][pebbles] = result
  }

  set_rule_range([x, y]: Coord, range: Filter, result: RuleBody) {
    for (let p = 0; p < 100; p++) {
      if (range(p)) this.rules[x][y][p] = result
    }
  }
}

