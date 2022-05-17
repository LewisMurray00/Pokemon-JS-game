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

class Boundary {
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

/* Checks for each row if the number 1025 is there and pushes it into the boundaries array*/
const boundaries = []
const offset = {
    x: -600,
    y: -450
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
    constructor({position, image, frames = {max:1}}){
        this.position = position
        this.image = image
        this.frames = frames
    }
//Draws the map sprite
    draw(){
        context.drawImage(
            this.image,
            /*arguments needed to crop the 4 sprites (crop position and crop height)*/
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            /* Arguments to assign the actual position of the sprite */
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
            )
    }
}

//Creating player sprite

// canvas.width / 2 - (this.image.width / 4) / 2, 
// canvas.height / 2 - this.image.height / 2,
/*Creating the offset for the boundary markings */


const background = new Sprite({position:{
    x: offset.x,
    y: offset.y
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

const testBoundary = new Boundary({
    position:{
        x:400,
        y:400
    }
})

const movables = [
    background, testBoundary
]

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    /* Drawing the boundaries */
    // boundaries.forEach(boundary=>{
    //     boundary.draw();
    // })
    testBoundary.draw()
   

        //Detecting collision barrier
        if(pla)


        //Moving sprite
        if(keys.w.pressed && lastKey === 'w'){
            movables.forEach((movable)=>{
                movable.position.y += 3
            })
        } else if(keys.a.pressed && lastKey === 'a'){
            movables.forEach((movable)=>{
                movable.position.x += 3
            })
        } else if(keys.s.pressed && lastKey === 's'){
            movables.forEach((movable)=>{
                movable.position.y -= 3
            })
        } else if(keys.d.pressed && lastKey === 'd'){
            movables.forEach((movable)=>{
                movable.position.x -= 3
            })
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
