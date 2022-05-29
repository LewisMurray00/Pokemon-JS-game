    /* Once the image is loaded it activates this command */
/* Creates an infinite loop */
class Sprite {
    constructor({position, image, frames = { max:1 }, sprites, animate = false }){
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0}
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate = animate
        this.sprites = sprites
    }
//Draws the map sprite
    draw(){
        context.drawImage(
            this.image,
            /*arguments needed to crop the 4 sprites (crop position and crop height)*/
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            /* Arguments to assign the actual position of the sprite */
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
            )

            if (!this.animate) return

            if (this.frames.max > 1){
                this.frames.elapsed++
            }

            if(this.frames.elapsed % 10 === 0){
                if(this.frames.val < this.frames.max-1) this.frames.val++
                else this.frames.val = 0
            }
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