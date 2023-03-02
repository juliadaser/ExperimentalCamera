let data_added = false;

function save_file() {

    // if person was too nervous, scared, unhappy - note is written in their records and the person is sent back to the line. 

    if (!data_added) {
        data_added = true;
        // personal information
        user_data.personal_information = {};
        user_data.personal_information.first_name = first_name;
        user_data.personal_information.last_name = last_name;
        user_data.personal_information.persumed_age = "still working on it";
        user_data.personal_information.persumed_gender = "still working on it";

        // adress
        user_data.location = {};
        user_data.location.ipadress = ipadress;
        user_data.location.longitude = longitude;
        user_data.location.latitude = latitude;
        user_data.location.postal_code = postal_code;
        user_data.location.city = city;
        user_data.location.country_name = country_name;
        user_data.location.continent_name = continent_name;

        // face tracking info
        user_data.biometric_data = {};
        user_data.biometric_data.average_face_width = int(average_face_width) + " px";
        user_data.biometric_data.average_nose_length = int(average_nose_length) + " px";
        user_data.biometric_data.average_eye_length = ["left eye: " + int(average_eye_length_left) + " px, ", "right_eye: " + int(average_eye_length_right) + " px"]
        user_data.biometric_data.average_mouth_width = int(average_mouth_width) + "  px";

        // emotion_tracking
        user_data.emotion_tracking = {};
        user_data.emotion_tracking.happiness = int(average_happy_value) + " px";
        user_data.emotion_tracking.scared = ["left eye: " + int(average_scared_value_left) + " px, ", "right_eye: " + int(average_scared_value_right) + " px"]
        user_data.emotion_tracking.nervous = average_nervous_value
        user_data.emotion_tracking.angriness = int(average_angry_value) + " px";


        // raw_data
        user_data.raw_data = {};
        user_data.raw_data.face_width = face_width_all_data;
        user_data.raw_data.nose_length = nose_length_all_data;
        user_data.raw_data.eye_length = eye_length_all_data;
        user_data.raw_data.mouth_width = mouth_width_all_data;

        SceneNum = 5
        data_added = false;

        // if (average_nervous_value[0] < 150 && average_happy_value > 20) {
        //     SceneNum = 5
        //     data_added = false;
        // } else {
        //     SceneNum = 0
        //     data_added = false;
        // }
    }
}