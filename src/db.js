import firebase from "firebase";

export function getDataById(id = '') {
    let keys = id?.substr(1, id.length - 1).split('_');
    let result;
    firebase.database().ref().on('value', (elem) => {
        result = elem.val();
    });
    switch (keys.length) {
        case 1:
            return result[keys[0]];
        case 2:
            return result[keys[0]]?.questions[keys[1]];
        case 3:
            return result[keys[0]]?.questions[keys[1]]?.answers[keys[2]];
        default:
            return result;
    }
}
export function sendSituations(situations) {
    firebase.database().ref().set(situations);
}