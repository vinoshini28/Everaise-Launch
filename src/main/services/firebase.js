import * as firebase from "firebase";

var subject = "mathi";

function init() {
  firebase
    .database()
    .ref()
    .set({
        mathiforumpostsmeta: "",
        mathiiforumpostsmeta: "",
        physicsmechanicsforumpostsmeta: "",
        linguisticsforumpostsmeta: "",
        astronomyforumpostsmeta: "",
        biologyforumpostsmeta: "",

        mathiforumpostsfull: "",
        mathiiforumpostsfull: "",
        physicsmechanicsforumpostsfull: "",
        linguisticsforumpostsfull: "",
        astronomyforumpostsfull: "",
        biologyforumpostsfull: ""
      },
      function (error) {
        if (error) {
          console.log("Error: " + error);
        }
      }
    );
  firebase
    .database()
    .ref()
    .child("metadata")
    .set({
        mathiposts: "",
        mathiiposts: "",
        physicsmechanicsposts: "",
        linguisticsposts: "",
        astronomyposts: "",
        biologyposts: ""
      },
      function (error) {
        if (error) {
          console.log("Error: " + error);
        }
      }
    );
}

function getMeta(subject) {
  firebase.database().ref().child('metadata').child(subject + "posts").on("value", (snap) => {
    return (snap.val())
  });
}

function getPostMeta(subject, n) {
  firebase.database().ref().child(subject + "forumpostsmeta").on(n, (snap) => {
    return (snap.val())
  });
}

function getPostFull(subject, n) {
  firebase.database().ref().child(subject + "forumpostsfull").on(n, (snap) => {
    return (snap.val())
  });
}
function post(user, userid, subject, date, post) {
  var n = getMeta(subject) + 1;
  firebase.database().ref().child(subject + "forumpostsmeta").child(n).set({
    user: user,
    subject: subject,
    title: title,
    date: date,
  });

  firebase.database().ref().child(subject + "forumpostsfull").child(n).set({
    user: user,
    userid: userid,
    subject: subject,
    title: title,
    date: date,
    post: post,
  });
}