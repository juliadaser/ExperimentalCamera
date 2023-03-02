let people_line_0 = [];
let colours_line_0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let people_line_1 = [];
let colours_line_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let people_line_2 = [];
let colours_line_2 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let people_crossed = 0;
let people_line_3 = [];
let colours_line_3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let people_line_4 = [];
let colours_line_4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let d;

let user_color = "green"

let user_position_x = 58;
let user_position_y = 200;

let line_one_stepping_through = false
let line_two_stepping_through = false
let line_three_stepping_through = false
let line_four_stepping_through = false
let line_five_stepping_through = false

let line_one_exiting = false
let line_two_exiting = false
let line_three_exiting = false
let line_four_exiting = false
let line_five_exiting = false

function waiting() {
    noStroke();

    push();
    scale(0.39);
    image(asset_waiting, -40, -35);
    pop();

    front_doors()

    // making sure the user follows the line.
    d = dist(people_line_2[5].x, people_line_2[5].y, mouseX, mouseY)
    // warning if user steps out of the line.
    if (d > 30) {
        user_color = "red"
    } else {
        user_color = "white"
        user_position_x = mouseX;
        user_position_y = mouseY;
    }

    push()
    fill(user_color)
    ellipse(user_position_x, user_position_y, 20, 20);
    pop()


    for (let i = 0; i < people_line_0.length; i++) {
        people_line_0[i].build();
        people_line_0[i].move();
    }

    for (let i = 0; i < people_line_1.length; i++) {
        people_line_1[i].build();
        people_line_1[i].move();
    }
    for (let i = 0; i < people_line_2.length; i++) {
        people_line_2[i].build();
        people_line_2[i].move();
    }
    for (let i = 0; i < people_line_3.length; i++) {
        people_line_3[i].build();
        people_line_3[i].move();
    }
    for (let i = 0; i < people_line_4.length; i++) {
        people_line_4[i].build();
        people_line_4[i].move();
    }

    if (mouseX >= 460 && mouseY > height / 2 - 30 && mouseY < height / 2 + 30 && d < 30) {
        SceneNum = 1
    }
}

class Person {
    constructor(x, y, offset, user_status) {
        this.x = x;
        this.y = y;
        this.offset = offset;
        this.move_character = false;
        this.start_frame = 0;
        this.startframecount = 0;

        this.user_status = user_status;
        this.color = "white"


        // position
        this.before_checkpoint = false;
        this.in_checkpoint = false;
        this.after_checkpoint = false;
    }

    build() {
        push()
        if (this.user_status == 1) {
            noStroke()
            noFill()
        } else {
            fill(this.color)
        }
        ellipse(this.x, this.y, 20, 20);
        pop()
    }

    move() {
        if (this.x <= 380) {
            this.before_checkpoint = true;
            this.in_checkpoint = false;
            this.after_checkpoint = false;
        } else if (this.x > 380 && this.x < 470) {
            this.before_checkpoint = false;
            this.in_checkpoint = true;
            this.after_checkpoint = false;
        } else {
            this.before_checkpoint = false;
            this.in_checkpoint = false;
            this.after_checkpoint = true;
        }
        if (this.x == 367) {
            if (this.y == height / 4 - 100) {
                line_one_stepping_through = true
            }
            if (this.y == height / 4) {
                line_two_stepping_through = true
            }
            if (this.y == height / 2) {
                line_three_stepping_through = true
            }
            if (this.y == 3 * (height / 4)) {
                line_four_stepping_through = true
            }
            if (this.y == 3 * (height / 4) + 100) {
                line_five_stepping_through = true
            }
        }

        if (this.x == 500 || this.x == 501 || this.x == 502) {
            if (this.y == height / 4 - 100) {
                line_one_exiting = true
            }
            if (this.y == height / 4) {
                line_two_exiting = true
            }
            if (this.y == height / 2) {
                line_three_exiting = true
            }
            if (this.y == 3 * (height / 4)) {
                line_four_exiting = true
            }
            if (this.y == 3 * (height / 4) + 100) {
                line_five_exiting = true
            }
        }

        if (this.before_checkpoint) {
            // before checkpoint: people move forwards
            if (frameCount % (350 + this.offset) == 0) {
                this.startframecount = frameCount;
                this.move_character = true;
            }
            if (this.move_character) {
                if (this.startframecount + 60 == frameCount) {
                    this.move_character = false;
                }
                this.x++;
            }
        }

        if (this.in_checkpoint) {
            // in checkpoint - person steps to machine, then leaves - machinized motion
            if (frameCount % (350 + this.offset) == 0) {

                this.startframecount = frameCount;
                this.move_character = true;
                people_crossed += 1;
                if (random(0, 1) > 0.8) {
                    this.color = "red"
                } else {
                    this.color = "green"
                }
            }
            if (this.move_character) {
                if (this.startframecount + 100 == frameCount) {
                    this.move_character = false;
                }
                this.x++;
            }
        }

        if (this.after_checkpoint && this.x < width + 50) {
            this.x += 3;
        }
    }
}

// DOOR 1 - entrance
let close_door_1 = false
let rotate_upper_door_1 = 0;
let rotate_lower_door_1 = 0;

// DOOR 1 - exit
let close_door_1e = false
let rotate_upper_door_1e = 0;
let rotate_lower_door_1e = 0;

// DOOR 2 - entrance
let close_door_2 = false
let rotate_upper_door_2 = 0;
let rotate_lower_door_2 = 0;

// DOOR 2 - exit
let close_door_2e = false
let rotate_upper_door_2e = 0;
let rotate_lower_door_2e = 0;

// DOOR 3 - entrance
let close_door_3 = false
let rotate_upper_door_3 = 0;
let rotate_lower_door_3 = 0;

// DOOR 3 - exit
let close_door_3e = false
let rotate_upper_door_3e = 0;
let rotate_lower_door_3e = 0;

// DOOR 4 - entrance
let close_door_4 = false
let rotate_upper_door_4 = 0;
let rotate_lower_door_4 = 0;

// DOOR 4 -exit
let close_door_4e = false
let rotate_upper_door_4e = 0;
let rotate_lower_door_4e = 0;

// DOOR 5
let close_door_5 = false
let rotate_upper_door_5 = 0;
let rotate_lower_door_5 = 0;

// DOOR 5
let close_door_5e = false
let rotate_upper_door_5e = 0;
let rotate_lower_door_5e = 0;

function front_doors() {

    // DOOR 1
    // front
    push()
    translate(385, -60)
    rotate(rotate_upper_door_1)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(392, 36)
    rotate(rotate_lower_door_1)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    //back
    push()
    translate(553, -60)
    rotate(rotate_upper_door_1e)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(560, 36)
    rotate(rotate_lower_door_1e)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    if (line_one_stepping_through) {
        if (!close_door_1 && rotate_upper_door_1 > -90) {
            rotate_upper_door_1 -= 2
            rotate_lower_door_1 += 2
        }
        if (rotate_upper_door_1 < -89) {
            close_door_1 = true
        }
        if (close_door_1 && rotate_upper_door_1 < 0) {
            rotate_upper_door_1 += 2
            rotate_lower_door_1 -= 2
        }
        if (rotate_upper_door_1 > -1) {
            close_door_1 = false
            line_one_stepping_through = false
        }
    }

    if (line_one_exiting) {
        if (!close_door_1e && rotate_upper_door_1e > -90) {
            rotate_upper_door_1e -= 2
            rotate_lower_door_1e += 2
        }
        if (rotate_upper_door_1e < -89) {
            close_door_1e = true
        }
        if (close_door_1e && rotate_upper_door_1e < 0) {
            rotate_upper_door_1e += 2
            rotate_lower_door_1e -= 2
        }
        if (rotate_upper_door_1e > -1) {
            close_door_1e = false
            line_one_exiting = false
        }
    }


    // DOOR 2
    //front
    push()
    translate(385, 50)
    rotate(rotate_upper_door_2)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(392, 140)
    rotate(rotate_lower_door_2)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    //back
    push()
    translate(553, 50)
    rotate(rotate_upper_door_2e)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(560, 140)
    rotate(rotate_lower_door_2e)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    if (line_two_stepping_through) {
        if (!close_door_2 && rotate_upper_door_2 > -90) {
            rotate_upper_door_2 -= 2
            rotate_lower_door_2 += 2
        }
        if (rotate_upper_door_2 < -89) {
            close_door_2 = true
        }
        if (close_door_2 && rotate_upper_door_2 < 0) {
            rotate_upper_door_2 += 2
            rotate_lower_door_2 -= 2
        }
        if (rotate_upper_door_2 > -1) {
            close_door_2 = false
            line_two_stepping_through = false
        }
    }
    if (line_two_exiting) {
        if (!close_door_2e && rotate_upper_door_2e > -90) {
            rotate_upper_door_2e -= 2
            rotate_lower_door_2e += 2
        }
        if (rotate_upper_door_2e < -89) {
            close_door_2e = true
        }
        if (close_door_2e && rotate_upper_door_2e < 0) {
            rotate_upper_door_2e += 2
            rotate_lower_door_2e -= 2
        }
        if (rotate_upper_door_2e > -1) {
            close_door_2e = false
            line_two_exiting = false
        }
    }

    // DOOR 3
    //front
    push()
    translate(385, 150)
    rotate(rotate_upper_door_3)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(392, 240)
    rotate(rotate_lower_door_3)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    //back
    push()
    translate(553, 150)
    rotate(rotate_upper_door_3e)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(560, 240)
    rotate(rotate_lower_door_3e)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    if (line_three_stepping_through) {
        if (!close_door_3 && rotate_upper_door_3 > -90) {
            rotate_upper_door_3 -= 2
            rotate_lower_door_3 += 2
        }
        if (rotate_upper_door_3 < -89) {
            close_door_3 = true
        }
        if (close_door_3 && rotate_upper_door_3 < 0) {
            rotate_upper_door_3 += 2
            rotate_lower_door_3 -= 2
        }
        if (rotate_upper_door_3 > -1) {
            close_door_3 = false
            line_three_stepping_through = false
        }
    }

    if (line_three_exiting) {
        if (!close_door_3e && rotate_upper_door_3e > -90) {
            rotate_upper_door_3e -= 2
            rotate_lower_door_3e += 2
        }
        if (rotate_upper_door_3e < -89) {
            close_door_3e = true
        }
        if (close_door_3e && rotate_upper_door_3e < 0) {
            rotate_upper_door_3e += 2
            rotate_lower_door_3e -= 2
        }
        if (rotate_upper_door_3e > -1) {
            close_door_3e = false
            line_three_exiting = false
        }
    }

    // DOOR 4 - entrance
    push()
    translate(385, 252)
    rotate(rotate_upper_door_4)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(392, 343)
    rotate(rotate_lower_door_4)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    // DOOR 4 - exit
    push()
    translate(553, 252)
    rotate(rotate_upper_door_4e)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(560, 343)
    rotate(rotate_lower_door_4e)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    if (line_four_stepping_through) {
        if (!close_door_4 && rotate_upper_door_4 > -90) {
            rotate_upper_door_4 -= 2
            rotate_lower_door_4 += 2
        }
        if (rotate_upper_door_4 < -89) {
            close_door_4 = true
        }
        if (close_door_4 && rotate_upper_door_4 < 0) {
            rotate_upper_door_4 += 2
            rotate_lower_door_4 -= 2
        }
        if (rotate_upper_door_4 > -1) {
            close_door_4 = false
            line_four_stepping_through = false
        }
    }

    if (line_four_exiting) {
        if (!close_door_4e && rotate_upper_door_4e > -90) {
            rotate_upper_door_4e -= 2
            rotate_lower_door_4e += 2
        }
        if (rotate_upper_door_4e < -89) {
            close_door_4e = true
        }
        if (close_door_4e && rotate_upper_door_4e < 0) {
            rotate_upper_door_4e += 2
            rotate_lower_door_4e -= 2
        }
        if (rotate_upper_door_4e > -1) {
            close_door_4e = false
            line_four_exiting = false
        }
    }



    // DOOR 5 - entrance
    push()
    translate(385, 355)
    rotate(rotate_upper_door_5)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(392, 443)
    rotate(rotate_lower_door_5)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()


    // DOOR 5 - exit
    push()
    translate(553, 355)
    rotate(rotate_upper_door_5e)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()

    push()
    translate(560, 443)
    rotate(rotate_lower_door_5e)
    rotate(180)
    fill("black")
    rect(0, 0, 7, 45, 5)
    pop()


    if (line_five_exiting) {
        if (!close_door_5e && rotate_upper_door_5e > -90) {
            rotate_upper_door_5e -= 2
            rotate_lower_door_5e += 2
        }
        if (rotate_upper_door_5e < -89) {
            close_door_5e = true
        }
        if (close_door_5e && rotate_upper_door_5e < 0) {
            rotate_upper_door_5e += 2
            rotate_lower_door_5e -= 2
        }
        if (rotate_upper_door_5e > -1) {
            close_door_5e = false
            line_five_exiting = false
        }
    }
}