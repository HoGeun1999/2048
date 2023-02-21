const table = document.getElementById('table')
const new_game_button = document.getElementById('new_game')
const td_list = []
const td_data_list = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
window.addEventListener("keydown", key_in )

function key_in(event){
    if (event.key === 'ArrowDown'){
        if(td_data_list[1][0] == 0){
            td_data_list[1][0] = td_data_list[0][0]
            td_data_list[0][0] = 0 
        }
        if(td_data_list[2][0] == 0){
            td_data_list[2][0] = td_data_list[1][0] 
            td_data_list[1][0] = 0
        }
        if(td_data_list[3][0] == 0){
            td_data_list[3][0] = td_data_list[2][0] 
            td_data_list[2][0] = 0
        }
    }

    updateTable()
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
            td_list.push(td)
        }
    }

}

function new_game(){
    set_table()
    td_data_list[0][0] = 2
    td_list[0].textContent = '2'
}

function updateTable(){
    for(let i =0; i < 4; i++){
        for(let j =0; j < 4; j++){
            if(td_data_list[i][j] != 0){
                td_list[i*4+j].textContent = td_data_list[i][j]
            }
        }
    }
}


new_game()
