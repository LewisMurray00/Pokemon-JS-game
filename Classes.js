    /* Once the image is loaded it activates this command */
/* Creates an infinite loop */
class Sprite {
    constructor({
        position, 
        image,
        frames = { max:1, hold: 10 }, 
        sprites, 
        animate = false, 
        rotation = 0}){
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
        this.rotation = rotation
    }
//Draws the map sprite
    draw(){
        context.save()
        context.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height/2
        )
        context.rotate(this.rotation)
        context.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height/2
        )
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
}

class Monster extends Sprite {
    constructor({position, image, frames = { max:1, hold: 10 }, sprites, animate = false, rotation = 0,
        isEnemy = false, 
        name
    }){
        super({
        position, 
        image,
        frames,
        sprites, 
        animate, 
        rotation
        })
            this.health = 100
            this.isEnemy = isEnemy
            this.name = name
    }
    /* Creating the attack constructor*/
    attack({attack, recipient, renderedSprites}){

        document.querySelector('#dialogueBox').style.display = "block"
        document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name

        let healthBar = '#enemyHealthBar'
        if(this.isEnemy) healthBar = '#playerHealthBar'

        let rotation = 1
        //Added the rotation for the enemy attacks
        if(this.isEnemy) rotation = -2.2

        this.health = this.health - attack.damage

        switch (attack.name){
            case 'Fireball':
                const fireballImage = new Image()
                fireballImage.src = './Images/fireball.png'

                const fireball = new Sprite({
                    position:{
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames:{
                        max:4,
                        hold:10
                    },
                    animate: true,
                    rotation
                })

                renderedSprites.splice(1, 0, fireball)

                //Make it move towards the enemy
                gsap.to(fireball.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,

                    // Remove the fireball sprite from the battle
                    onComplete: ()=> {
                        
                        gsap.to(healthBar,{
                            width: this.health - attack.damage + '%'
                        })
    
                        //Moves the enemy once its been hit
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
                        renderedSprites.splice(1, 1)
                    }
                })
            break;
            case 'Tackle':
            /* Using GSAP to animate the sprite in a 'tackle' way */
            const timeline = gsap.timeline()
        
            let movementDistance = 20
            if(this.isEnemy) movementDistance = -20

            timeline.to(this.position, {
                x:this.position.x - movementDistance
            }).to(this.position, {
                x:this.position.x + movementDistance * 3,
                duration: 0.1,
            
                //Code where the enemy gets hit
                onComplete: ()=>{

                    gsap.to(healthBar,{
                        width: this.health - attack.damage + '%'
                    })

                    //Moves the enemy once its been hit
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
            break;
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