const canvas = document.querySelector('canvas');

/* Referencing canvas context */
const context = canvas.getContext('2d')


/* Setting the height and width of the canvas */
canvas.height = 576;
canvas.width = 1024;

/* A for loop that runs through the array and counts in 70 increments to create the maps rows */
const collisionsMap = []
for (let i=0; i< collisions.length;i+=70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}

/* creating a loop to lay out the battle zone area */

const battleZonesMap = []
for (let i=0; i< battleZoneData.length;i+=70){
    battleZonesMap.push(battleZoneData.slice(i, 70 + i))
}

/* Checks for each row if the number 1025 is there and pushes it into the boundaries array*/
const boundaries = []
const offset = {
    x: -600,
    y: -470
}

collisionsMap.forEach((row,i)=>{
    row.forEach((symbol,j)=>{
        if(symbol===1025)
        boundaries.push(
            new Boundary({
                position:{
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

/* Push in the battlezone tile into the battlezone 2d array */
const battleZones = []

battleZonesMap.forEach((row,i)=>{
    row.forEach((symbol,j)=>{
        if(symbol===1025)
        battleZones.push(
            new Boundary({
                position:{
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})


/* Adding the image to the screen */

    /* Creating the image as an object */
    const mapImage = new Image()
    mapImage.src = './Images/palletTown.png'

    // Creating the foreground image
    const foregroundImage = new Image()
    foregroundImage.src = './Images/foregroundObject.png'

    /* Adding the Player Image */
    const playerDownImage = new Image()
    playerDownImage.src = "./Images/playerDown.png"

    const playerUpImage = new Image()
    playerUpImage.src = "./Images/playerUp.png"

    const playerLeftImage = new Image()
    playerLeftImage.src = "./Images/playerLeft.png"

    const playerRightImage = new Image()
    playerRightImage.src = "./Images/playerRight.png"

//Creating player sprite
const  playerSprite = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2, 
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

/*Creating the offset for the boundary markings */


const background = new Sprite({position:{
    x: offset.x,
    y: offset.y
    },
    image: mapImage
})

const foreground = new Sprite(
    {position:{
    x: offset.x,
    y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w:{
        pressed:false
    },

    a:{
        pressed:false
    },

    s:{
        pressed:false
    },

    d:{
        pressed:false
    },   
}


const movables = [
    background, ...boundaries, foreground, ...battleZones
]

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

// Creating a battle variable
const battle = {
    initiated: false
}

function animate(){
    const animationId = window.requestAnimationFrame(animate)
    background.draw()
    /* Drawing the boundaries */
    boundaries.forEach(boundary=>{
        boundary.draw();
    })
    /* Drawing out the battle area and render it */
    battleZones.forEach(battleZones=>{
        battleZones.draw();
    })
    playerSprite.draw() 
    foreground.draw()

    //Moving sprite
    let moving = true
    playerSprite.moving=false

    if(battle.initiated) return

    /* Refactored code for the battle detection to save pasting it 4 times */
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        /*Detection for the battle zone*/
        for(let i = 0; i < battleZones.length; i++){
            const battleZone = battleZones[i]
            const overlappingArea = 
            /* Math function that works out if majority of the sprite is in the overlapping area and if it is then it will log */
            (Math.min(playerSprite.position.x + playerSprite.width, battleZone.position.x + battleZone.width) -
            Math.max(playerSprite.position.x, battleZone.position.x)) * 
            (Math.min(playerSprite.position.y + playerSprite.height, battleZone.position.y + playerSprite.height) -
            Math.max(playerSprite.position.y,battleZone.position.y))
           
        if(
                rectangularCollision({
                    rectangle1: playerSprite,
                    rectangle2: battleZone
                }) &&
                overlappingArea > playerSprite.width * playerSprite.height / 2
                && Math.random() < 0.01
            ){
                console.log("battle zone")
                //Deactivate current animation loop
                window.cancelAnimationFrame(animationId)
               battle.initiated = true;
               // Animating the black flash on the screen during a battle
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete(){
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete(){
                                //Activate a new animation loop 
                                animateBattle()
                                gsap.to('#overlappingDiv', {
                                    opacity: 1,
                                    duration: 0.4,
                                })
                            }
                        })
                    }
                })
                break
            }
        }
    }

        if(keys.w.pressed && lastKey === 'w'){
            
            playerSprite.moving=true
            playerSprite.image = playerSprite.sprites.up
        
            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if(
                    rectangularCollision({
                        rectangle1: playerSprite,
                        rectangle2: {...boundary, 
                            position:{
                                x:boundary.position.x,
                                y:boundary.position.y + 3
                        }}
                    })
                ){
                    moving = false
                    break
                }
            }

            if (moving)
                movables.forEach((movable)=>{
                movable.position.y += 3
            })

        } else if(keys.a.pressed && lastKey === 'a'){
            
            playerSprite.moving=true
            playerSprite.image = playerSprite.sprites.left

            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if(
                    rectangularCollision({
                        rectangle1: playerSprite,
                        rectangle2: {...boundary, 
                            position:{
                                x:boundary.position.x + 3,
                                y:boundary.position.y
                        }}
                    })
                ){
                    moving = false
                    break
                }
            }
            if (moving)
            movables.forEach((movable)=>{
                movable.position.x += 3
            })
        } else if(keys.s.pressed && lastKey === 's'){

            playerSprite.moving=true
            playerSprite.image = playerSprite.sprites.down

            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if(
                    rectangularCollision({
                        rectangle1: playerSprite,
                        rectangle2: {...boundary, 
                            position:{
                                x:boundary.position.x,
                                y:boundary.position.y - 3
                        }}
                    })
                ){
                    moving = false
                    break
                }
            }
            if (moving)
            movables.forEach((movable)=>{
                movable.position.y -= 3
            })
        } else if(keys.d.pressed && lastKey === 'd'){

            playerSprite.moving=true
            playerSprite.image = playerSprite.sprites.right

            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if(
                    rectangularCollision({
                        rectangle1: playerSprite,
                        rectangle2: {...boundary, 
                            position:{
                                x:boundary.position.x - 3,
                                y:boundary.position.y
                        }}
                    })
                ){
                    moving = false
                    break
                }
            }
            if (moving)
            movables.forEach((movable)=>{
                movable.position.x -= 3
            })
        }
}
animate()

//Assigning the background image to a variable
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './Images/battleBackground.png'

//Assigning the background to a sprite
const battleBackground = new Sprite({
    position: {
        x:0,
        y:0
    },
    image: battleBackgroundImage
})

function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    console.log('animate battle')
}

let lastKey = ''

/*Listens out for when a key is pressed */
/* Adding movement to the sprite */
window.addEventListener('keydown', (e)=>{
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e)=>{
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})
