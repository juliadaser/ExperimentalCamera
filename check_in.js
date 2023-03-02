let running_check_in_first_time = true;
let insert_last_name = "lastname"

function check_in() {
  background("gray")

  push();
  scale(0.35);
  image(screen_asset_check_in, 700, -80);
  pop();

  if (running_check_in_first_time) {
    // CREATING INFOMRATION FIELDS
    // first name
    first_name_field = createInput("First Name");
    first_name_field.position(290, 220);
    first_name_field.size(200);
    first_name_field.input(first_name_field_input);

    // last name
    last_name_field = createInput("Last Name");
    last_name_field.position(290, 260);
    last_name_field.size(200);
    last_name_field.input(last_name_field_input);

    // button
    button = createButton('Continue');
    button.position(420, 310);
    button.mousePressed(next_scene, function () { button.remove() });

    running_check_in_first_time = false
  }
}

function first_name_field_input() {
  first_name = this.value()
}

function last_name_field_input() {
  last_name = this.value()
}

function next_scene() {
  if (first_name != null && last_name != null) {
    SceneNum += 1;
    running_check_in_first_time = true
  }
}