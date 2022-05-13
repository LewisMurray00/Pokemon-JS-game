const canvas = document.querySelector('canvas');

/* Referencing canvas context */
const context = canvas.getContext('2d')

/* Setting the height and width of the canvas */
canvas.height = 576;
canvas.width = 1024;

context.fillStyle = 'white'
context.fillRect(0,0, canvas.width, canvas.height)

/* Adding the image to the screen */

    /* Creating the image as an object */
    const mapImage = new Image()
    mapImage.src = './Images/palletTown.png'

    /* Adding the Player Image */
    const playerImage = new Image()
    playerImage.src = "./Images/playerDown.png"


    /* Once the image is loaded it activates this command */
    mapImage.onload = () => {
        context.drawImage(mapImage,-600,-450)
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
    }

