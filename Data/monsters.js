// Creating our hero on the battleground
const embyImage = new Image()
embyImage.src = './Images/embySprite.png'

const dragglesImage = new Image()
dragglesImage.src = './Images/draggleSprite.png'

const monsters = {
    Emby: {
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
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.Fireball]
    },

    Draggles: {
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
            name: 'Draggles',
            attacks: [attacks.Tackle, attacks.Fireball]
    }
}