    /* Once the image is loaded it activates this command */
/* Creates an infinite loop */
class Sprite {
    constructor({position, image, frames = {max:1}}){
        this.position = position
        this.image = image
        this.frames = frames
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
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

class Boundary {
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        context.fillStyle = 'rgba(255,0,0,0.0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}