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

const dragglesImage = new Image()
dragglesImage.src = './Images/draggleSprite.png'

// Create new sprites for the enemy characters
const draggles = new Sprite({
    position:{
        x:800,
        y:100
    },
    image: dragglesImage,
    frames:{
        max: 4,
        hold:30
    },
    animate: true,
    isEnemy: true,
    name: 'Draggles'
})

// Creating our hero on the battleground
const embyImage = new Image()
embyImage.src = './Images/embySprite.png'

const emby = new Sprite({
    position:{
        x:280,
        y:325
    },
    image: embyImage,
    frames:{
        max: 4,
        hold:30
    },
    animate: true,
    name: 'Emby'
})

const renderedSprites = [draggles, emby]

function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}

animateBattle()

//Adding event listener for the battle attack buttons
document.querySelectorAll('button').forEach(button =>{
    button.addEventListener('click', (e)=>{
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        emby.attack({
            attack: selectedAttack,
            recipient: draggles,
            renderedSprites
        })
    })
})