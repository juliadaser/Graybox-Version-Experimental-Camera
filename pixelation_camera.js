// FOR API
var ipadress;
var coordinates;
let country;

let pixel_amount_left;
let line_x = 400;
let shapeMove = false;
let d = 0;

// creating user selection
let sel;
let selected_country = "select country";

// JSON file with Media Autonomy Index
let data;
let media_autonomy_right;
let media_autonomy_left;


let strokecolor = "red"

function pixelate_video() {
    // drop down menu user selection
    sel.changed(mySelectEvent);

    // looking for Media Autonomy Index in user's location
    for (let i = 0; i < 162; i++) {
        if (country == data[i].Country_EN) {
            media_autonomy_left = data[i]["Political Context"];
        }
    }

    // looking for Media Autonomy Index in user's selected country
    for (let i = 0; i < 162; i++) {
        if (selected_country == data[i].Country_EN) {
            media_autonomy_right = data[i]["Political Context"];
        }
    }


    // pixel data _left
    pixel_amount_left = int(media_autonomy_left)
    let skip_amount_left = floor((windowHeight / pixel_amount_left));

    // pixel data right
    pixel_amount_right = int(media_autonomy_right)
    let skip_amount_right = floor((windowHeight / pixel_amount_right));

    // // mirroring video
    // push()
    // translate(video.width, 0);
    // scale(-1, 1);
    // pop()

    // loading video
    video.loadPixels();

    // LEFT SIDE
    for (let x = 0; x < line_x; x += skip_amount_left) {
        for (let y = 0; y < video.height; y += skip_amount_left) {

            //this is the index of the array
            let pindex = (x + (y * video.width)) * 4;
            //this is the rbg value inside the index        
            let r = video.pixels[pindex + 0];
            let g = video.pixels[pindex + 1];
            let b = video.pixels[pindex + 2];

            fill(r, g, b);

            rect(x, y, windowWidth / pixel_amount_left, windowHeight / pixel_amount_left);

        }
    }
    // RIGHT SIDE
    for (let x = line_x; x < windowWidth; x += skip_amount_right) {
        for (let y = 0; y < video.height; y += skip_amount_right) {

            //this is the index of the array
            let pindex = (x + (y * video.width)) * 4;
            //this is the rbg value inside the index        
            let r = video.pixels[pindex + 0];
            let g = video.pixels[pindex + 1];
            let b = video.pixels[pindex + 2];

            fill(r, g, b);

            rect(x, y, windowWidth / pixel_amount_right, windowHeight / pixel_amount_right);

        }
    }

    // drawing the border between the different sides of the canvases
    push()
    stroke(strokecolor)
    strokeWeight(10)
    line(line_x, 0, line_x, windowHeight)
    pop()

    fill("red")
    textSize(40)
    text("live location", 50, 100)
    text(country, 50, 150)


    text("compared to", windowWidth - 300, 100)
    text(selected_country, windowWidth - 300, 150)

    // idea: compare multiple countries. - select two contries and then make the border between them draggable. drag n drop countries to the top - one side is your location, other side is other location
}

function mousePressed() {
    d = mouseX - line_x
    if (d > -50 && d < 50) {
        shapeMove = true;
    } else {
        shapeMove = false;
        strokecolor = "red"
    }
}

function mouseReleased() {
    shapeMove = false
}

function mouseDragged() {

    if (shapeMove) {
        strokecolor = "blue"
        line_x = mouseX;
    }

    // stops line at borders
    if (line_x > windowWidth - 300) {
        line_x = windowWidth - 301
    }
    if (line_x < 300) {
        line_x = 301
    }
}

function mySelectEvent() {
    selected_country = sel.value();
}