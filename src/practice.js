var test = {
  prop: 42,
  runFunc: () => {
    this.arrfunc();
  },
  arrfunc: () => {
    console.log(this);
  },
};

var test2 = {
  prop: 43,
  norfunc: function() {
    console.log(this);
  },
};

function normalFunction() {
  console.log(this);
}

var arrowFunction = () => {
  console.log(this);
}

// test.runFunc(); // window object
// test.arrfunc(); // window object
// test2.norfunc(); // test2 object
// normalFunction(); // window object
// arrowFunction(); // window object

function firstFunction () {
  var privateVariable = 'private';
  console.log(this);
  function secondFunction() {
    // console.log(privateVariable);
  console.log(this);
  }

  return secondFunction();

}

var obj = {
  name: "Joel",
  level: "pro"
};

var instanceFunction =  firstFunction.bind(obj);
instanceFunction(); // prints obj2 and window object for the two "this" console logs respectively.


function firstFunctionArrow () {
  var privateVariable = 'private';
  console.log(this);
  var secondFunctionArrow = () => {
    // console.log(privateVariable);
  console.log(this);
  }

  return secondFunctionArrow();

}

var obj2 = {
  name: "Joel-2",
  level: "pro-2"
};

var instanceFunctionArrow =  firstFunctionArrow.bind(obj2);
instanceFunctionArrow(); // prints obj2 for both "this" console logs
