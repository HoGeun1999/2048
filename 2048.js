const table2048 = document.getElementById('table2048')
const newGameButton = document.getElementById('newGame')
const tdElementList = []
const tdDataList = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
const eventKeyList = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']
const dicTdColor = {
    0: 'td0',
    2: 'td2',
    4: 'td4',
    8: 'td8',
    16: 'td16',
    32: 'td32',
    64: 'td64',
    128: 'td128',
    256: 'td256',
    512: 'td512',
    1024: 'td1024',
    2048: 'td2048'
}
const score = document.getElementById('score')
let scorePoint = 0
newGameButton.onclick = function () {
    newGame()
}

window.addEventListener("keydown", keyIn)

function keyIn(event) {
    const beforeTdDataList = tdDataList.map(v => v.slice())
    if (eventKeyList.indexOf(event.key) !== -1) {
        if (event.key === 'ArrowDown') {
            ArrowDown()
        } else if (event.key === 'ArrowUp') {
            ArrowUp()
        } else if (event.key === 'ArrowLeft') {
            ArrowLeft()
        } else if (event.key === 'ArrowRight') {
            ArrowRight()
        }

        const fullCheckBool = fullCheck()
        if (moveCheck(beforeTdDataList) && !fullCheckBool) {
            makeRandomNum2()
        } else {
            if (gameOverCheck() && fullCheckBool) {
                alert("GAME OVER")
            }
        }
        score.textContent = 'Score = ' + scorePoint
        printDataList()
        updateTable()

        if (gameWin()) {
            setTimeout(() => {
                alert('You Win')
                window.removeEventListener("keydown",keyIn)
            }, 1000);
        }

    } else {
        console.log(100)
    }
}

function mergeTrAndSumScore(trList) {
    const mergedTrList = []
    for (let i = 0; i < 4; i++) {
        if (i === 3) {
            mergedTrList.push(trList[i])
        } else if (trList[i] === trList[i + 1]) {
            const num = trList[i] + trList[i + 1]
            scorePoint = scorePoint + num
            mergedTrList.push(num)
            i = i + 1
        } else {
            mergedTrList.push(trList[i])
        }
    }
    return mergedTrList
}

function makeListLenFour(trList) {
    const trListLen = trList.length
    for (let i = 0; i < 4 - trListLen; i++) {
        trList.push(0)
    }
}

function ArrowDown() {
    for (let i = 0; i < 4; i++) {
        const trList = []
        for (let j = 0; j < 4; j++) {
            if (tdDataList[3 - j][i] !== 0) {
                trList.push(tdDataList[3 - j][i])
            }
        }
        makeListLenFour(trList)
        const mergedTrList = mergeTrAndSumScore(trList)
        makeListLenFour(mergedTrList)

        for (let k = 0; k < 4; k++) {
            tdDataList[3 - k][i] = mergedTrList[k]
        }
    }
}

function ArrowUp() {
    for (let i = 0; i < 4; i++) {
        const trList = []
        for (let j = 0; j < 4; j++) {
            if (tdDataList[j][i] !== 0) {
                trList.push(tdDataList[j][i])
            }
        }
        makeListLenFour(trList)
        const mergedTrList = mergeTrAndSumScore(trList)
        makeListLenFour(mergedTrList)

        for (let k = 0; k < 4; k++) {
            tdDataList[k][i] = mergedTrList[k]
        }
    }
}

function ArrowLeft() {
    for (let i = 0; i < 4; i++) {
        const trList = []
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][j] !== 0) {
                trList.push(tdDataList[i][j])
            }
        }
        makeListLenFour(trList)
        const mergedTrList = mergeTrAndSumScore(trList)
        makeListLenFour(mergedTrList)

        for (let k = 0; k < 4; k++) {
            tdDataList[i][k] = mergedTrList[k]
        }
    }
}

function ArrowRight() {
    for (let i = 0; i < 4; i++) {
        const trList = []
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][3 - j] !== 0) {
                trList.push(tdDataList[i][3 - j])
            }
        }
        makeListLenFour(trList)
        const mergedTrList = mergeTrAndSumScore(trList)
        makeListLenFour(mergedTrList)

        for (let k = 0; k < 4; k++) {
            tdDataList[i][3 - k] = mergedTrList[k]
        }
    }
}


function setTable() {

    for (let i = 0; i < 4; i++) {
        const tr = document.createElement('tr')
        tr.id = i + 1
        table2048.appendChild(tr)
        for (let j = 0; j < 4; j++) {
            const td = document.createElement('td')
            td.id = i * 4 + j + 1
            tr.appendChild(td)
            tdElementList.push(td)
            tdDataList[i][j] = 0
        }
    }
}


function updateTable() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][j] !== 0) {
                tdElementList[i * 4 + j].textContent = tdDataList[i][j]
            } else {
                tdElementList[i * 4 + j].textContent = ' '
            }
            tdElementList[i * 4 + j].className = dicTdColor[tdDataList[i][j]]
        }
    }
}


function makeRandomNum2() {
    const randomIndexList = []
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (tdDataList[i][j] === 0) {
                randomIndexList.push(i * 4 + j)
            }
        }
    }

    const numIndex = Math.floor(Math.random() * (randomIndexList.length))
    const indexX = parseInt(randomIndexList[numIndex] / 4)
    const indexY = randomIndexList[numIndex] % 4
    tdDataList[indexX][indexY] = 2

}


function fullCheck() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][j] === 0) {
                return false
            }
        }
    }

    return true
}


function moveCheck(beforeTdDataList) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][j] !== beforeTdDataList[i][j]) {
                return true
            }
        }
    }

    return false
}


function gameOverCheck() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tdDataList[i][j] === tdDataList[i][j + 1]) {
                return false
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tdDataList[j][i] === tdDataList[j + 1][i]) {
                return false
            }

        }
    }

    return true
}

function gameWin() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][j] === 2048) {
                return true
            }
        }
    }

    return false
}


function newGame() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            tdDataList[i][j] = 0
        }
    }
    scorePoint = 0
    score.textContent = 'Score = ' + scorePoint
    makeRandomNum2()
    makeRandomNum2()
    overrideTdDataList()
    updateTable()
}


function printDataList() {
    const arr = []
    for (let i = 0; i < 4; i++) {
        const list = []
        for (let j = 0; j < 4; j++) {
            list.push(tdDataList[i][j])
        }
        arr.push(list.join(', '))
    }
    console.log(arr.join('\n'))
    console.log(' ')
}


function overrideTdDataList() {
    const arr = [
        [0, 0, 2, 2],
        [0, 0, 8, 2],
        [0, 16, 4, 2],
        [0, 1024, 1024, 0]
    ]

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            tdDataList[i][j] = arr[i][j]
        }
    }
}

setTable()