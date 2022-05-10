const canvas = document.querySelector('canvas');

/* Referencing canvas context */
const context = canvas.getContext('2d')

/* Setting the height and width of the canvas */
canvas.height = 576;
canvas.width = 1024;

context.fillStyle = 'white'
context.fillRect(0,0, canvas.width, canvas.height)