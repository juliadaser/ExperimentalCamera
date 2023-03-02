// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2

// references
// https://p5js.org/reference/#/p5/saveJSON

// WRIET STATEMENT ABOUT USING problematic tool with thoughtfulness and intentionality - actually extremely superficial
// machines decide within milliseconds
// machines at recognizing and understanding human emotion
// when going back - the same data is still stored - making it really hard to change parameters enough to pass next time - idea:data never forgets.


// TODO
// face filter of airport


// JSON file
let user_data = {};

// name
var first_name;
var last_name;
var persumed_age = 19;
var persumed_gender = "female";

// other
var ipadress;

// location
var longitude;
var latitude;
var postal_code;
var city;
var country_name;
var continent_name;

// intenet providor
var org;
var hostname;

let SceneNum = 0;

let w = 600;
let h = 400;

// Assets
let screen_asset_check_in;
let asset_waiting;
let asset_camera_background;
let asset_camera_red;
let asset_camera_green;
let asset_successful_background;

function preload() {
  let getting_ip_adress = "https://api.ipify.org?format=json";
  loadJSON(getting_ip_adress, gotData);

  screen_asset_check_in = loadImage("/Assets/Screen.png");
  asset_waiting = loadImage("/Assets/waiting.png");
  angleMode(DEGREES);
  asset_camera_background = loadImage("/Assets/Camera.png");
  asset_camera_red = loadImage("/Assets/red.png");
  asset_camera_green = loadImage("/Assets/green.png");
  asset_successful_background = loadImage("/Assets/successful.png");
}

function gotData(data) {

  ipadress = data.ip;

  all_information = data;
  longitude = data.longitude;
  latitude = data.latitude;
  postal_code = data.postal_code;
  city = data.city;
  country_name = data.country_name;
  continent_name = data.continent_name;

  org = data.org;
  hostname = data.hostname;
}

function setup() {
  filter(GRAY);


  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function () {
    console.log('capture ready.')
  });
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

  // API
  let url = "https://json.geoiplookup.io/";
  let getting_coordinates = url.concat(ipadress);
  loadJSON(getting_coordinates, gotData);


  // loading people for waiting scene:
  for (let i = 0; i < 20; i++) {
    people_line_0[i] = new Person(380 - 20 - (60 * i), height / 4 - 100, i * 5, colours_line_0[i]);
  }

  for (let i = 0; i < 20; i++) {
    people_line_1[i] = new Person(380 - 20 - (60 * i), height / 4, i * 15, colours_line_1[i]);
  }

  for (let i = 0; i < 20; i++) {
    people_line_2[i] = new Person(380 - 20 - (60 * i), height / 2, i * 2, colours_line_2[i]);
  }

  for (let i = 0; i < 20; i++) {
    people_line_3[i] = new Person(380 - 20 - (60 * i), 3 * (height / 4), i * 28, colours_line_3[i]);
  }

  for (let i = 0; i < 20; i++) {
    people_line_4[i] = new Person(380 - 20 - (60 * i), 3 * (height / 4) + 100, i * 9, colours_line_4[i]);
  }
}


function draw() {
  switch (SceneNum) {
    case 0:
      waiting();
      break;

    case 1:
      check_in();
      break;

    case 2:
      face_tracker();
      break;

    case 3:
      save_file();
      break

    case 4:
      go_back();
      break

    case 5:
      successful()
      break

    // case 6:
    //   explanation()
    //   break
  }
}