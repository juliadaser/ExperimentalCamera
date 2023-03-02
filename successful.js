let background_width = -250
let text_width = 500
let download_data_one_time = true;
let button_two;

function successful() {
    // add doors and make background movement speed up or slow down
    // make circle morph into a different shape

    noStroke()
    // background pic
    push();
    scale(0.39);
    image(asset_successful_background, background_width, -25);
    pop();

    if (background_width > -800) {
        background_width -= 3;
    }

    if (text_width > 100) {
        text_width -= 1.5;
    }

    fill("green")
    ellipse(mouseX, mouseY, 25, 25)

    textSize(25);
    fill("white")

    text("in e-Bordercontrol", text_width + 100, 100)
    text("your behavioural and biological data", text_width - 10, 150)
    text("is collected, saved, and made", text_width + 40, 200)
    text("internationally accessible.", text_width + 50, 250)

    if (text_width <= 100) {
        // create button two
        button_two = createButton('Access your data');
        button_two.position(240, 310);
        button_two.mousePressed(access_data);
    }
}

function access_data() {
    if (download_data_one_time) {
        saveJSON(
            user_data,
            "DataProfile_" + first_name + "_" + last_name + ".json"
        );
        download_data_one_time = false
    }
}