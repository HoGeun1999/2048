const table = document.getElementById('table')
const new_game_button = document.getElementById('new_game')
const tdList = []
const tdDataList = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
const eventKeyList = ['ArrowDown','ArrowUp','ArrowLeft','ArrowRight']

window.addEventListener("keydown", key_in )

function key_in(event){
    if(eventKeyList.indexOf(event.key) != -1){
        if(event.key === 'ArrowDown'){
            ArrowDown()
        }
        else if(event.key === 'ArrowUp'){
            ArrowUp()
        }
        else if(event.key === 'ArrowLeft'){
            ArrowLeft()
        }
        else if(event.key === 'ArrowRight'){
            ArrowRight()
        }

        
        makeRandomNum2()
        console.log(tdDataList)
            
        updateTable()
    }
    else{
        console.log(100)
    }
}

function ArrowDown(){
    for(let i = 0; i < 4; i++){
        const ArrowDownList = []
        for(let j = 0; j < 4; j++){
            if(tdDataList[3-j][i] != 0){
                ArrowDownList.push(tdDataList[3-j][i])
            }
        }      
        
        const ArrowDownListLen = ArrowDownList.length
        for(k = 0; k < 4 - ArrowDownListLen ; k++){
            ArrowDownList.push(0)
        }
        
        const ArrowDownAnswer = []
        for(p = 0; p < 4; p++){
            if(p === 3){
                ArrowDownAnswer.push(ArrowDownList[p])
            }
            if(ArrowDownList[p] === ArrowDownList[p+1]){
                num1 = ArrowDownList[p] + ArrowDownList[p+1]
                ArrowDownAnswer.push(num1)
                p = p + 1
            }
            else{
                ArrowDownAnswer.push(ArrowDownList[p])
            }
        }


        const ArrowDownAnswerLen = ArrowDownAnswer.length
        for(r = 0; r < 4 - ArrowDownAnswerLen ; r++){
            ArrowDownAnswer.push(0)
        }

        for(s = 0; s < 4; s++){
            tdDataList[3-s][i] = ArrowDownAnswer[s]
        }
    }
        

}

function ArrowUp(){

    console.log(102)     
}

function ArrowLeft(){

    console.log(103)     
}

function ArrowRight(){

    console.log(104)     
}



function set_table(){

    for(i = 0; i < 4; i++){
        const tr = document.createElement('tr')
        tr.id = i+1
        table.appendChild(tr)
        for(j = 0; j < 4; j++){
            const td = document.createElement('td')
            td.id = i*4+j+1
            tr.appendChild(td)
            tdList.push(td)
            tdDataList[i][j] = 0 
        }
    }
}

function new_game(){
    set_table()
    makeRandomNum2()
    makeRandomNum2()
    updateTable()
}

function updateTable(){
    for(let i =0; i < 4; i++){
        for(let j =0; j < 4; j++){
            if(tdDataList[i][j] != 0){
                tdList[i*4+j].textContent = tdDataList[i][j]
            }
            else{
                tdList[i*4+j].textContent = ''

            }
        }
    }
}

function makeRandomNum2(){
    const randomIndexList = []
    for(i = 0; i < 4; i++){
        for(j = 0; j < 4; j++){
            if(tdDataList[i][j] === 0){
                randomIndexList.push(i*4+j)
            }
        }
    }

    const numIndex = Math.floor(Math.random()*(randomIndexList.length))
    const indexX = parseInt(randomIndexList[numIndex]/4)
    const indexY = randomIndexList[numIndex]%4
    tdDataList[indexX][indexY] = 2

}



new_game()
