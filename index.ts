const MAX_TOWER_HEIGHT = 6
const MAX_DISC_WIDTH = MAX_TOWER_HEIGHT * 2 + 1

let towers = {
    A: [],
    B: [],
    C: []
}

let movingDisc = null

function genTower() {
    for (let index = MAX_TOWER_HEIGHT; index > 0; index--) {
        towers.A.push(index * 2 + 1)
    }
}

function printFullLine() {
    console.log(genLengthyString("-", MAX_DISC_WIDTH * 3))
}

function genLengthyString(sign: string, n: number) {
    let string = ""
    for (let index = 0; index < n; index++) string += sign
    return string
}

function printTowers() {
    let rowStrings = []
    for (let row = -2; row < MAX_TOWER_HEIGHT + 1; row++) {
        let rowString: string = ""
        for (let i in towers) {
            const disc = towers[i][row]
            if (disc) {
                const padding = Math.floor((MAX_DISC_WIDTH - disc) / 2)
                rowString += genLengthyString(" ", padding)
                rowString += genLengthyString(disc === movingDisc ? "▣" : "▢", disc)
                rowString += genLengthyString(" ", padding)
            } else {
                if (row == -1) {
                    rowString += genLengthyString("-", MAX_DISC_WIDTH)
                } else {
                    rowString += genLengthyString(" ", MAX_TOWER_HEIGHT)
                    rowString += row == -2 ? i : "|"
                    rowString += genLengthyString(" ", MAX_TOWER_HEIGHT)
                }

            }
        }
        rowStrings.push(rowString)
    }
    rowStrings.reverse().forEach(rowString => console.log(rowString))
}

async function move(from, to) {
    printFullLine()
    console.log(`|\t    MOVE: From ${from} To ${to}\t      |`)
    printFullLine()
    movingDisc = towers[from].pop()
    towers[to].push(movingDisc)
}

function hanoi(n, from, helper, to) {
    if (n == 0) {
        return
    }

    hanoi(n - 1, from, to, helper)
    printTowers()
    console.log('\n')
    move(from, to)
    hanoi(n - 1, helper, from, to)

}

console.log('\n\nWELCOME TO TOWERS OF HANOI!\nSTARTING WITH:')
printFullLine()
console.log(`|      WELCOME TO TOWERS OF HANOI!    |`)
printFullLine()

genTower()
hanoi(MAX_TOWER_HEIGHT, "A", "B", "C")
printTowers()