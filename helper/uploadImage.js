// Create a root reference
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
var mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name            // true
mountainsRef.fullPath === mountainImagesRef.fullPath

// var file = ... // use the Blob or File API
// ref.put(file).then(function(snapshot) {
//   console.log('Uploaded a blob or file!');
// });

var metadata = {
    contentType: 'image/jpeg',
  };
var uploadTask = storageRef.child('images/mountains.jpg').put(file, metadata);