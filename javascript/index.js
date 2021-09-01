// first constants na declare maadana
// constants
let inputDir = {x : 0 , y : 0};
// const foodsound = new Audio ('FoodSound.mp3');
// const gameOverSound = new Audio ('gameOver.mp3');
// const moveSound = new Audio ('MUSIC, SOUNDS/moveSound.mp3');
// const musicSound = new Audio ('music.mp3');
let speed = 6;
let level = 0;
let previouslevel = 0;
let count = 0;
let lastpaintTime = 0;
let score = 0;
var counter = 0;
// idu snake du head
let snakearr = [
    {x : 13, y : 12}
]
food = {x : 3 , y : 4};
// Don't use semicolon

// Game Methods and Functions
function main(currentTime){
    //so alli main logic nalli ond sati first time fire aagatte ee main function using
    // requestAnimation frame amele naavu idna pade pade kareetivi and we'll make this
    // function paint and render again and again andre frame rate jaasti aagatte
    window.requestAnimationFrame(main);
    counter++;
    // console.log(counter);
    if(counter%100 == 0){
        counter = counter%100;
        count++;
        // console.log(count);
    }
    if(count/10 === 1){
        count = count%10;
        level++;
        // console.log(level);
    }
    if(level != previouslevel){
        speed++;
        // console.log(speed);
        previouslevel = level;
        Level.innerHTML = "LEVEL : " + level;
    }
    // console.log(currentTime);
    if(((currentTime - lastpaintTime)/1000) < 1/speed){
        // currentTime = currentTime * 2;
        // console.log("currentTime");
        return;
    }
    lastpaintTime = currentTime;
    gameEngine();
}

function isCollide (snakearr){
    // if we collide into ourself
    for(let i = 1 ; i < snakearr.length; i++){
        if(snakearr[i].x === snakearr[0].x && snakearr[0].y === snakearr[i].y){
            alert("game got over fool. You bit your own ass as expected, press any key to play the game again, if you want that is!.");
            return true;
        }
    }
    if(snakearr[0].x >= 15 || snakearr[0].x <= 0 || snakearr[0].y >= 15 || snakearr[0].y <= 0){
        alert("game got over fool. You got your ass kicked by the wall, press any key to play the game again, if you want that is!.");
        return true;
    }

}

function gameEngine(){
    // part 1 : Updating the snake array and food
    
    if( isCollide(snakearr) ){
        // gameOverSound.play();
        // musicSound.pause();
        inputDir = {x : 0, y : 0};
        // same alli macro li starting nalli en declare 
        // maadidvo initial position adne declare maadbeku
        
        snakearr = [{x : 13 , y : 12}];
        food = {x : 3 , y : 4};
        // musicSound.play();
        
        score = 0;
        Score.innerHTML = "SCORE : " + score;
        level = 0;
        counter = 0;
        count = 0;
        speed = 1;
    }
    // Snake thindid takshna score increment aagatte and food regenerate aagatte
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        score++;
        Score.innerHTML = "SCORE : " + score;
        snakearr.unshift({x : snakearr[0].x + inputDir.x , y : snakearr[0].y + inputDir.y});
        //snakearr ge unshift add maadatte element na
        food = {x : Math.round(2 + (14 - 2) * Math.random()) , y : Math.round(2 + (14 - 2) * Math.random())};
    }

    //Moving the snake
    for(let i = snakearr.length - 2; i >= 0; i--){
        // snakearr[i+1] = snakearr[i];
        // idu bandu invisible snake ge idu level 2
        snakearr[i+1] = {...snakearr[i]};
    }
    snakearr[0].x = snakearr[0].x + inputDir.x;
    snakearr[0].y = snakearr[0].y + inputDir.y;
 


    // part 2 : render or display the snake food

    // DISPLAY THE SNAKE ELEMENT
    var bo = document.querySelector(".board");
    bo.innerHTML = "";
    // akasmath id iddiddre haage select maadboodittu but class aagiddrinda
    // class na firstu select maadkondu amele adna change maadbeku

    // idu yaake andre first bandaaga board khaali irbeku amele snake irbeku
    snakearr.forEach((e, index) => {/*for each loop ond arrow function tagolatte and snakeElement 
        na add maadtaairatte*/
        // console.log(e);
        snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = e.y;
        // andre start aadaaga x = 15 position nalli andre alli naavu mele declare maadideevi alva
        // aa jaagdalli add aagatte aa createElement("div")
        snakeElement.style.gridColumnStart = e.x;
        // and ee column nalli add aagatte snake du head, as we write the
        // attribute add after and only create element , so snakeelement nalli add
        // div add maadbekittu so head is a div as we know

        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakeBody');
        }

        bo.appendChild(snakeElement);
    })

    // DISPLAY THE FOOD ELEMENT
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    bo.appendChild(foodElement);
}


// Main logic idu and mele idara methods ide
///eega ond game du ond game loop irbeku andre nam screen na prathi sathi nu paint maadbeku
// andre repeat aagta irbeku
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x : 0 , y : 1}
    // start the game key press aad takshna
    // yaakandre keydown aadaaga event listener haakideevi
    // so as we press any key the snake starts moving downwards yaakandre y = 1
    // moveSound.play();
    console.log(e);
    switch(e.key) {
        case "ArrowUp" :
            console.log("ArrowUp");
            inputDir.x = 0 ;
            inputDir.y = -1 ;
            break;

        case "ArrowDown" :
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1 ;
            break;

        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputDir.x = -1 ;
            inputDir.y = 0 ;
            break;

        case "ArrowRight" :
            console.log("ArrowRight");
            inputDir.x = 1 ;
            inputDir.y = 0 ;
            break;
        
        default :
        break;
    }
    // amele moveSound play aagatte
    
})