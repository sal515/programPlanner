/*
* This file only has example codes - for future reference or quick review
* !!! Nothing to do with the project itself !!!
*
* */

var exports = module.exports = {};

/*
* copy and run the commented out codes below the test function to test it,
* To run the testingFunc() - run it in a controller with REST End point exposed
* */
exports.testingFunc = function () {

  // --------------------------------------------------------
  // testing the async and await functions
  asyncAwait().catch();


  // --------------------------------------------------------
  // testing promise all
  // Promise.all([p1, p2, p3]).then((values) => {
  //   // 4 seconds later...
  //   // values: ["2quick", [1, 2, 3], 1337]
  //   console.log(values);
  // });
  // --------------------------------------------------------
  // testing promise only
  // const promise = new Promise( function(resolve, reject) {
  //   setTimeout( () => {
  //     resolve( [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9] );
  //   }, 2000);
  // });
  //
  // promise
  // // .then(logPlease)
  //   .then(onlyEvenNumbers)
  //   // .then(logPlease)
  //   .then(sumOfArray)
  //   .then(logPlease)
  //   .catch(errorHandler);


};


// ================================ Promise Examples ==================================================

// Usage example of Async / Await in the project  - In this example data was fetched from DB

// step 1: create the async function - analogous to a driverFunc() as follows:
async function asyncAddCourseSubController(userInput, req, res, next) {
  const query = await checkCourseExistDuringSemester(userInput, req, res, next);
  // console.log(query);
  // console.log(typeof query);
  // let queryObj = JSON.parse(query);
  console.log(query);
  let queryObj = query;
  // return.length -- works for findall() because return is an array
  console.log(queryObj.length);
  // return[object.termCode] -- works for findOne() because return is a JSON object
  console.log(queryObj.object.termCode);
  console.log(queryObj["object"]["termCode"]);

}


// step2: create the functions that need to be called synchronously/sequentially in the above function
function checkCourseExistDuringSemester(userInput, req, res, next) {
  return new Promise((resolve,reject) => {
    // ============= How to do query ===================================
    // ======== Check if the course Exists =======================
    // const query = scheduleModel.find();
    const query = scheduleModel.findOne();
    query.setOptions({lean: true});
    query.collection(scheduleModel.collection);
    // example to do the query in one line
    // query.where('object.courseSubject').equals(userInput.courseSubject).exec(function (err, scheduleModel) {
    // building a query with multiple where statements
    query.where('object.courseSubject').equals(userInput.courseSubject);
    query.where('object.courseCatalog').equals(userInput.courseCatalog);
    // query.where('object.termTitle').equals(userInput.termTitle);
    query.where('object.termDescription').equals(userInput.termDescription);
    query.exec((err, result) => {
      // console.log("From the sub function: " + query);
      resolve(result);
      reject(err);
    });
  });
}

// step 3: Now you can call the async function anywhere you like
// for the example I called it in one of the controller methods that gets by the REST Calls
// mainFunc(userInput, req, res, next);














//  -------------------------------- Async / Await examples ---------------------------
// Reference1 ::: https://medium.com/dailyjs/asynchronous-adventures-in-javascript-async-await-bd2e62f37ffd
// Reference2 ::: https://medium.com/@tkssharma/writing-neat-asynchronous-node-js-code-with-promises-async-await-fa8d8b0bcd7c
// Reference3 ::: https://javascript.info/async-await
// Reference4 ::: https://medium.com/dailyjs/asynchronous-adventures-in-javascript-promises-1e0da27a3b4

// example 1: To see how JS is async - try taking out some of the await keywords in the calls
async function asyncAwait() {
  var aVal = null;
  try {
    const first = await promiseFunc(aVal);
    console.log(first);

    const second = await promiseFunc(first);
    console.log(second);

    const third = await promiseFunc(second);
    console.log(third);

    aVal = third;
    console.log(aVal);

  } catch (e) {
    console("Error");
  }
}

function promiseFunc(val) {
  return new Promise(resolve => {
    if (val == null) {
      val = -1;
    } else if (val === -1) {
      val = -2;
    } else if (val === -2) {
      val = -3;
    }
    resolve(val);
  });
}

// Syntax Example ::
// The getPost function should return a promise to make this async function to work
// async function updateBlogPost(postId, modifiedPost) {
//   const oldPost = await getPost(postId);
//   const updatedPost = { ...oldPost, ...modifiedPost };
//   const savedPost = await savePost(updatedPost);
//   return savedPost;
// }


//  -------------------------------- Async / Await examples ---------------------------


// ------------------------------------------------ Promise.all() --------------------------------
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("2quick");
  }, 1000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve([1, 2, 3]);
  }, 4000);
});

const p3 = Promise.resolve(1337);

// Promise.all([p1, p2, p3]).then((values) => {
//   // 4 seconds later...
//   // values: ["2quick", [1, 2, 3], 1337]
//   console.log(values);
// });


// ---------------------- promise --------------------------------------------------------------------
// const promise = new Promise( function(resolve, reject) {
//   setTimeout( () => {
//     resolve( [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9] );
//   }, 2000);
// });
//
// promise
// // .then(logPlease)
//   .then(onlyEvenNumbers)
//   // .then(logPlease)
//   .then(sumOfArray)
//   .then(logPlease)
//   .catch(errorHandler);


function onlyEvenNumbers(array) {
  return array.filter((value) => {
    return (value % 2) === 0;
  });
}

function sumOfArray(array) {
  return array.reduce((a, b) => {
    return a + b;
  }, 0);
}

function logPlease(value) {
  console.log(value);
  return value;
}

function errorHandler(err) {
  console.log("ERROR");
  console.log(err);
}


// ================================= Promise Examples =================================================


// =============== Database test query functions ===================================================
// This is an example function not used anywhere in the project


function testQueryBuilder() {
  // user input should have the following:
  //  -> userID
  //  -> Semester selected
  //  -> Course Subject
  //  -> Course Code
  // const userInput = req.body;
  // Example or Test statement from postman --> in the body ->> x-www-form-urlencoded was selected
  // let testTitle = userInput.COEN;

  // setting the mongoose debugging to true
  const mongoose = require("mongoose");
  mongoose.set('debug', true);

  dbHelpers.defaultConnectionToDB();

  // both findOne() and find() works
  // const query = scheduleModel.find();
  const query = scheduleModel.findOne();
  query.setOptions({lean: true});
  query.collection(scheduleModel.collection);
  // example to do the query in one line
  // query.where('object.courseSubject').equals(userInput.courseSubject).exec(function (err, scheduleModel) {
  // building a query with multiple where statements
  query.where('object.courseSubject').equals(userInput.courseSubject);
  query.where('object.courseCatalog').equals(userInput.courseCatalog);
  query.exec(function (err, scheduleModel) {
    try {
      res.status(200).json({
        userInput,
        scheduleModel,
        message: "addCourseToSequence executed"
      })
      // }
    } catch (err) {
      console.log("Error finding the course provided by the user");
      res.status(200).json({
        message: "Internal Server Error: Course not found"
      })
    }
  });
}

// ============== Database test query ===================================================

