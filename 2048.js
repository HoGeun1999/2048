const table2048 = document.getElementById('table2048')
const newGameButton = document.getElementById('newGame')
const tdList = []
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
    if (eventKeyList.indexOf(event.key) != -1) {
        if (event.key === 'ArrowDown') {
            ArrowDown()
        } else if (event.key === 'ArrowUp') {
            ArrowUp()
        } else if (event.key === 'ArrowLeft') {
            ArrowLeft()
        } else if (event.key === 'ArrowRight') {
            ArrowRight()
        }

        const moveCheckBool = moveCheck(beforeTdDataList)
        const gameOverCheckBool = gameOverCheck()
        const fullCheckBool = fullCheck()
        if (moveCheckBool === true && fullCheckBool === false) {
            makeRandomNum2()
        } else {
            if (gameOverCheckBool === true && fullCheckBool === true) {
                alert("GAME OVER")
            }
        }
        score.textContent = 'Score = ' + scorePoint
        printDataList()
        updateTable()

        const gameWinBool = gameWin()
        if (gameWinBool === true) { 
            setTimeout(() => {alert('You Win')}, 1000);
        }

    } else {
        console.log(100)
    }
}


function ArrowDown() { // 상하좌우 합치는 리펙토링이 생각보다 어려움
    const moveCheck = false
    for (let i = 0; i < 4; i++) {
        const ArrowDownList = []
        for (let j = 0; j < 4; j++) {
            if (tdDataList[3 - j][i] != 0) {
                ArrowDownList.push(tdDataList[3 - j][i])
            }
        }

        const ArrowDownListLen = ArrowDownList.length
        for (let k = 0; k < 4 - ArrowDownListLen; k++) {
            ArrowDownList.push(0)
        }

        const ArrowDownAnswer = []
        for (let p = 0; p < 4; p++) {
            if (p === 3) {
                ArrowDownAnswer.push(ArrowDownList[p])
                break
            }
            if (ArrowDownList[p] === ArrowDownList[p + 1]) {
                num1 = ArrowDownList[p] + ArrowDownList[p + 1]
                scorePoint = scorePoint + num1
                ArrowDownAnswer.push(num1)
                p = p + 1
            } else {
                ArrowDownAnswer.push(ArrowDownList[p])
            }
        }
        const ArrowDownAnswerLen = ArrowDownAnswer.length
        for (let r = 0; r < 4 - ArrowDownAnswerLen; r++) {
            ArrowDownAnswer.push(0)
        }
        for (let s = 0; s < 4; s++) {
            tdDataList[3 - s][i] = ArrowDownAnswer[s]
        }
    }

    return moveCheck
}

function ArrowUp() {
    for (let i = 0; i < 4; i++) {
        const ArrowUpList = []
        for (let j = 0; j < 4; j++) {
            if (tdDataList[j][i] != 0) {
                ArrowUpList.push(tdDataList[j][i])
            }
        }

        const ArrowUpListLen = ArrowUpList.length
        for (let k = 0; k < 4 - ArrowUpListLen; k++) {
            ArrowUpList.push(0)
        }

        const ArrowUpAnswer = []
        for (let p = 0; p < 4; p++) {
            if (p === 3) {
                ArrowUpAnswer.push(ArrowUpList[p])
                break
            }
            if (ArrowUpList[p] === ArrowUpList[p + 1]) {
                num1 = ArrowUpList[p] + ArrowUpList[p + 1]
                ArrowUpAnswer.push(num1)
                scorePoint = scorePoint + num1
                p = p + 1
            } else {
                ArrowUpAnswer.push(ArrowUpList[p])
            }
        }
        const ArrowUpAnswerLen = ArrowUpAnswer.length
        for (let r = 0; r < 4 - ArrowUpAnswerLen; r++) {
            ArrowUpAnswer.push(0)
        }
        for (let s = 0; s < 4; s++) {
            tdDataList[s][i] = ArrowUpAnswer[s]
        }
    }
}

function ArrowLeft() {
    for (let i = 0; i < 4; i++) {
        const ArrowLeftList = []
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][j] != 0) {
                ArrowLeftList.push(tdDataList[i][j])
            }
        }

        const ArrowLeftListLen = ArrowLeftList.length
        for (let k = 0; k < 4 - ArrowLeftListLen; k++) {
            ArrowLeftList.push(0)
        }

        const ArrowLeftAnswer = []
        for (let p = 0; p < 4; p++) {
            if (p === 3) {
                ArrowLeftAnswer.push(ArrowLeftList[p])
                break
            }
            if (ArrowLeftList[p] === ArrowLeftList[p + 1]) {
                num1 = ArrowLeftList[p] + ArrowLeftList[p + 1]
                ArrowLeftAnswer.push(num1)
                scorePoint = scorePoint + num1
                p = p + 1
            } else {
                ArrowLeftAnswer.push(ArrowLeftList[p])
            }
        }
        const ArrowLeftAnswerLen = ArrowLeftAnswer.length
        for (let r = 0; r < 4 - ArrowLeftAnswerLen; r++) {
            ArrowLeftAnswer.push(0)
        }
        for (let s = 0; s < 4; s++) {
            tdDataList[i][s] = ArrowLeftAnswer[s]
        }
    }
}

function ArrowRight() {
    for (let i = 0; i < 4; i++) {
        const ArrowRightList = []
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][3 - j] != 0) {
                ArrowRightList.push(tdDataList[i][3 - j])
            }
        }

        const ArrowRightListLen = ArrowRightList.length
        for (let k = 0; k < 4 - ArrowRightListLen; k++) {
            ArrowRightList.push(0)
        }

        const ArrowRightAnswer = []
        for (let p = 0; p < 4; p++) {
            if (p === 3) {
                ArrowRightAnswer.push(ArrowRightList[p])
                break
            }
            if (ArrowRightList[p] === ArrowRightList[p + 1]) {
                num1 = ArrowRightList[p] + ArrowRightList[p + 1]
                ArrowRightAnswer.push(num1)
                scorePoint = scorePoint + num1
                p = p + 1
            } else {
                ArrowRightAnswer.push(ArrowRightList[p])
            }
        }
        const ArrowRightAnswerLen = ArrowRightAnswer.length
        for (let r = 0; r < 4 - ArrowRightAnswerLen; r++) {
            ArrowRightAnswer.push(0)
        }
        for (let s = 0; s < 4; s++) {
            tdDataList[i][3 - s] = ArrowRightAnswer[s]
        }
    }
}


function setTable() {

    for (i = 0; i < 4; i++) {
        const tr = document.createElement('tr')
        tr.id = i + 1
        table2048.appendChild(tr)
        for (j = 0; j < 4; j++) {
            const td = document.createElement('td')
            td.id = i * 4 + j + 1
            tr.appendChild(td)
            tdList.push(td)
            tdDataList[i][j] = 0
        }
    }
}


function updateTable() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tdDataList[i][j] != 0) {
                tdList[i * 4 + j].textContent = tdDataList[i][j]
            } else {
                tdList[i * 4 + j].textContent = ' '
            }
            tdList[i * 4 + j].className = dicTdColor[tdDataList[i][j]]
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
            if (tdDataList[i][j] != beforeTdDataList[i][j]) {
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