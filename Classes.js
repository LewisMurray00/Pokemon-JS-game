    /* Once the image is loaded it activates this command */
/* Creates an infinite loop */
class Sprite {
    constructor({position, image, frames = { max:1, hold: 10 }, sprites, animate = false }){
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0}
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
    }
//Draws the map sprite
    draw(){
        context.save()
        context.globalAlpha = this.opacity
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
            context.restore()

            if (!this.animate) return

            if (this.frames.max > 1){
                this.frames.elapsed++
            }

            if(this.frames.elapsed % this.frames.hold === 0){
                if(this.frames.val < this.frames.max-1) this.frames.val++
                else this.frames.val = 0
            }
    }
    /* Creating the attack constructor*/
    attack({attack, recipient}){
        /* Using GSAP to animate the sprite in a 'tackle' way */
        const timeline = gsap.timeline()
        timeline.to(this.position, {
            x:this.position.x - 20
        }).to(this.position, {
            x:this.position.x + 60,
            duration: 0.1,
            onComplete(){
                gsap.to(recipient.position, {
                    x: recipient.position.x + 10,
                    yoyo:true,
                    repeat: 5,
                    duration: 0.08
                })

                //Add a opacity feature
                gsap.to(recipient, {
                    opacity: 0,
                    repeat: 5,
                    yoyo:true,
                    duration: 0.08
                })
            }
        }).to(this.position,{
            x:this.position.x
        })
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