// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2


// face tracking
var capture;
var tracker
let positions = []

let time_in_face_tracking = 0;

// face measurements
let face_width_all_data = [];
let average_face_width = 0;
let face_width;

let nose_length_all_data = [];
let average_nose_length = 0;
let nose_length;

let eye_length_all_data = [];
let average_eye_length_right = 0;
let average_eye_length_left = 0;

let mouth_width_all_data = [];
let average_mouth_width = 0;
let mouse_width;

// recording emotions
// scared - big eyes (24 - 26) (29-31)
let scared_value_array = [];
let average_scared_value_right = 0;
let average_scared_value_left = 0;
let scared;

// angry - narrow eyebrows
let angry_value_array = [];
let average_angry_value = 0;
let angry;

// happy - mouth
let happy_value_array = [];
let average_happy_value = 0;
let happy;

// nervous - moving head around a lot
let nervous_value_array = [];
let average_nervous_value = 0;

function face_tracker() {

  // positions = array of all points - each point is an object of x and y coordinate
  positions = tracker.getCurrentPosition();
  // print(positions[62][0], positions[62][1])
  // print(mouseX, mouseY)

  // timer for scene 2
  time_in_face_tracking += 1 / 60;

  // clearing the input fields of scene 1
  button.hide()
  first_name_field.hide()
  last_name_field.hide()

  // mirroring the video for selfie view
  translate(capture.width, 0);
  scale(-1, 1);
  image(capture, 0, 0, w, h);

  //face frame red 
  push();
  scale(0.52);
  image(asset_camera_red, 270, 200);
  pop();

  if (positions != "0") {
    if (positions[62][0] > 250 && positions[62][0] < 300 && positions[62][1] > 177 && positions[62][1] < 233) {
      push();
      scale(0.52);
      image(asset_camera_green, 270, 200);
      pop();
    }
  }

  //camera frame
  push();
  translate(width, 0);
  scale(-1, 1);
  scale(0.52);
  image(asset_camera_background, 0, -20);
  pop();

  // tracking the positions
  if (positions != "0") {

    // checking whether the face is in the screen:
    // if (positions[0][0] positions[0][1])

    // tracking face position
    append(face_width_all_data, dist(positions[0][0], positions[0][1], positions[14][0], positions[14][1]));
    append(nose_length_all_data, dist(positions[33][0], positions[33][1], positions[62][0], positions[62][1]));
    append(eye_length_all_data, [dist(positions[23][0], positions[23][1], positions[25][0], positions[25][1]), dist(positions[30][0], positions[30][1], positions[28][0], positions[28][1])]);
    append(mouth_width_all_data, dist(positions[44][0], positions[44][1], positions[50][0], positions[50][1]));


    // tracking face expression
    append(scared_value_array, [dist(positions[24][0], positions[24][1], positions[26][0], positions[26][1]), dist(positions[29][0], positions[29][1], positions[31][0], positions[31][1])]);
    append(angry_value_array, dist(positions[22][0], positions[22][1], positions[18][0], positions[18][1]));
    append(happy_value_array, dist(positions[44][0], positions[44][1], positions[50][0], positions[50][1]));

    append(nervous_value_array, [positions[62][0], positions[62][1]])
  }

  // // draws the line outline of all dots (x and y psoition)
  // noFill();
  // stroke(255);
  // beginShape();
  // for (var i = 0; i < positions.length; i++) {
  //   vertex(positions[i][0], positions[i][1]);
  // }
  // endShape();

  // // draws little dot and text at all points
  // noStroke();
  // for (var i = 0; i < positions.length; i++) {
  //   fill(map(i, 0, positions.length, 0, 360), 50, 100);
  //   ellipse(positions[i][0], positions[i][1], 4, 4);
  //   text(i, positions[i][0], positions[i][1]);
  // }


  if (time_in_face_tracking > 5) {

    // Average face width
    face_width = new Calculate_average(face_width_all_data)
    average_face_width = face_width.calculate()

    // Average  nose_length
    nose_length = new Calculate_average(nose_length_all_data)
    average_nose_length = nose_length.calculate()

    // Average eye_length
    mouse_width = new Calculate_average(mouth_width_all_data)
    average_mouth_width = mouse_width.calculate()

    // Average Eye lengh
    let sum = 0;
    for (let i = 0; i < eye_length_all_data.length; i++) {
      average_eye_length_left += eye_length_all_data[i][0];
      average_eye_length_right += eye_length_all_data[i][1];
    }
    average_eye_length_left = average_eye_length_left / eye_length_all_data.length;
    average_eye_length_right = average_eye_length_right / eye_length_all_data.length;


    // tracking emotions:
    // Average scared_value
    for (let i = 0; i < scared_value_array.length; i++) {
      average_scared_value_left += eye_length_all_data[i][0];
      average_scared_value_right += eye_length_all_data[i][1];
    }
    average_scared_value_left = average_scared_value_left / scared_value_array.length;
    average_scared_value_right = average_scared_value_right / scared_value_array.length;


    // Average angry_value
    angry = new Calculate_average(angry_value_array)
    average_angry_value = angry.calculate()

    // Average happy_values
    happy = new Calculate_average(happy_value_array)
    average_happy_value = happy.calculate()

    let smallest_number_x = nervous_value_array[0][0];
    let biggest_number_x = nervous_value_array[0][0];
    let smallest_number_y = nervous_value_array[0][0];
    let biggest_number_y = nervous_value_array[0][0];

    // tracking nervousness
    for (i = 0; i < nervous_value_array.length; i += 1) {
      if (nervous_value_array[i][0] < smallest_number_x) {
        smallest_number_x = nervous_value_array[i][0]
      }
      if (nervous_value_array[i][0] > biggest_number_x) {
        biggest_number_x = nervous_value_array[i][0]
      }
      if (nervous_value_array[i][1] < smallest_number_y) {
        smallest_number_y = nervous_value_array[i][1]
      }
      if (nervous_value_array[i][1] > biggest_number_y) {
        biggest_number_y = nervous_value_array[i][1]
      }
    }
    average_nervous_value = [biggest_number_x - smallest_number_x, biggest_number_y - smallest_number_y]

    // resetting values
    time_in_face_tracking = 0;

    SceneNum = 3;
  }
}

// my own "average calculator" class!!
class Calculate_average {
  constructor(array) {
    this.array = array;
    this.average = 0;
  }

  calculate() {
    for (let i = 0; i < this.array.length; i++) {
      this.average += this.array[i];
    }
    this.average = this.average / this.array.length;
    return this.average
  }
}
