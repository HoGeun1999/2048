var table = document.getElementById('table')
var new_game_button = document.getElementById('new_game')
td_list = []

function set_table(){

    for(i = 0; i < 4; i++){
        var tr = document.createElement('tr')
        tr.id = i+1
        table.appendChild(tr)
        for(j = 0; j < 4; j++){
            var td = document.createElement('td')
            td.id = i*4+j+1
            tr.appendChild(td)
            td_list.push(td)
        }
    }


}

function new_game(){
    set_table()
    td_list[0].textContent = '2'
    Math.random()
}

new_game()