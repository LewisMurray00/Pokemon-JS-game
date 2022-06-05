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

// Create new sprites for the enemy characters
const draggles = new Monster(monsters.Draggles)
const emby = new Monster(monsters.Emby)

const renderedSprites = [draggles, emby]

emby.attacks.forEach(attack => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
    
})



function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}

animateBattle()

//Creating a queue that holds both good and bad attacks 
const queue = []

//Adding event listener for the battle attack buttons
document.querySelectorAll('button').forEach(button =>{
    button.addEventListener('click', (e)=>{
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        emby.attack({
            attack: selectedAttack,
            recipient: draggles,
            renderedSprites
        })

        const randomAttack = draggles.attacks[Math.floor(Math.random() * draggles.attacks.length)]

        queue.push(()=>{
            draggles.attack({
                attack: randomAttack,
                recipient: emby,
                renderedSprites
            })
        })
    })
})

//Updating dialogue box with enemy attacks and then the next phase
document.querySelector('#dialogueBox').addEventListener('click', (e)=>{
    if(queue.length > 0){
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'

})