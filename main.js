const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this._field = field;
    }

    get field() {
        return this._field;
    }

    print() {
        for(let i=0; i < this._field.length; i++){
            console.log(this._field[i].join(''))
        }
    }
    
    location(x,y) {
        this._field[x][y] = '*';
    }

    path(x,y) {
        this._field[x][y] = String.fromCharCode(215);
    }

    static generateField (height,width,difficulty) {
        let randomArray = [];
        const randomRow = (w,d) => {
            let row = [];
            for(let i = 0; i < w; i++){
                let num = Math.floor(Math.random()*10);
                if(num <= d){
                    row.push('O')
                }
                else {
                    row.push('░')
                }
            }
            return row;
        }
        for(let j = 0; j < height; j++){
            randomArray.push(randomRow(width,difficulty))
        }
        randomArray[0][0] = '*';
        let hatX = 0;
        let hatY = 0;
        while(hatX===0 && hatY===0){
            hatX = Math.floor(Math.random()*height);
            hatY = Math.floor(Math.random()*width);
        }
        randomArray[hatX][hatY] = '^';
        return randomArray;
    }
}

const play = (field) => {
    let x = 0;
    let y = 0;
    let gameOver = false;
    while(gameOver === false){
        field.print();
        let move = prompt('Choose w,s,a,or d to move: ');
        switch (move) {
            case 'w':
                field.path(x,y);
                x -= 1;
                break;
            case 's':
                field.path(x,y);
                x += 1;
                break;
            case 'a':
                field.path(x,y);
                y -= 1;
                break;
            case 'd':
                field.path(x,y);
                y += 1;
                break;
            default:
                console.log('invalid input')     
        } 
        let position = field.field[x][y];
        if(position === '░' || position === String.fromCharCode(215)) {
            field.location(x,y)
        }
        else if (position === 'O'){
            console.log('You fell in a hole, Game Over!')
            gameOver = true;
        }
        else if (position === '^'){
            console.log('You Win')
            gameOver = true;
        }
        else {
            console.log('You fell off the end, Game Over!')
            gameOver = true;
        }
    }
}
const firstField = new Field([
    ['*','░','░','░','░','░'],
    ['O','░','░','O','O','░'],
    ['^','O','░','░','O','░'],
    ['░','░','O','░','O','░'],
    ['O','░','O','O','░','░'],
    ['O','░','░','░','░','░'],
])

const difficulty = () => {
    const level = prompt('CHOOSE YOUR DIFFICULTY \n Type E for easy \n Type M for medium \n Type H for hard \n Then press enter');
    const height = prompt('Type a number for the Height of the grid \n Then press enter');
    const width = prompt('Type a number for the Width of the grid \n Then press enter');
    let diff = 0;
    switch(level){
        case 'e':
            diff = 2;
            break;
        case 'm':
            diff = 4;
            break;
        case 'h':
            diff = 6;
            break;
        default:
            console.log('Please enter a valid difficulty');
            break;
    }
    let newField = Field.generateField(Number(height),Number(width),diff);
    return newField; 
}


const mapPick = () =>{
    const choice = prompt('Type 1 for the standard map  \n Type 2 for a random map \n Then press enter');
    if(choice === '1'){
        play(ranField);
    }
    else if(choice === '2'){
        const randomField = new Field(difficulty());
        play(randomField);
    }
    else{
        console.log('please select 1 or 2')
    }
}
/*Game Play*/
prompt('Find Your Hat by Max Houston \n Use W-A-S-D to navigate the star * to the hat ^. \n Avoid the O and the edge of the map \n Press enter to continue ')

mapPick();


