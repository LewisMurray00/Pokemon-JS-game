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




/* Adding the image to the screen */

    /* Creating the image as an object */
    const mapImage = new Image()
    mapImage.src = './Images/palletTown.png'

    /* Adding the Player Image */
    const playerImage = new Image()
    playerImage.src = "./Images/playerDown.png"


    /* Once the image is loaded it activates this command */
/* Creates an infinite loop */
class Sprite {
    constructor({position, image}){
        this.position = position
        this.image = image
    }

    draw(){
        context.drawImage(this.image, this.position.x,this.position.y)
    }
}

const background = new Sprite({position:{
    x:-600,
    y:-450
    },
    image: mapImage
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

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    context.drawImage(
        playerImage,
        /*arguments needed to crop the 4 sprites (crop position and crop height)*/
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        /* Arguments to assign the actual position of the sprite */
        canvas.width / 2 - (playerImage.width / 4) / 2, 
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
        )

        if(keys.w.pressed && lastKey === 'w'){
            background.position.y += 3
        } else if(keys.a.pressed && lastKey === 'a'){
            background.position.x += 3
        } else if(keys.s.pressed && lastKey === 's'){
            background.position.y -= 3
        } else if(keys.d.pressed && lastKey === 'd'){
            background.position.x -= 3
        }
}
animate()

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
