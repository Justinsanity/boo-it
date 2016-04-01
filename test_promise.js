// var i = 0;
// var p = new Promise(function(res, rej){
//     for(; i<10000; i++);
//       res(i);
// });
// console.log(p);
// p.then(function(value){console.log('abc'); value++;}, function(e){console.log(e)});


///////////////////////////
// function cb(){ return 3 + 19; }
// function foo(callback){ return callback(); }

// function * gen() {
//   console.log('start');
//   yield 1;
//   console.log('stop');
// //   yield foo(cb);
//   foo(cb);
//   console.log('end')
// }

// var g = gen();
// a = g.next();
// console.log(a.value)
// b = g.next();
// console.log(b)
// c = g.next();
// console.log(c)

///////////////////////////////
// var mongoose  = require('mongoose');
// var connection = mongoose.connect('localhost/test');
// var Bear = mongoose.model( 'bears', new mongoose.Schema({
//     name:           String,
//     description:    String
// }));

// function* db(){
//     var i = 0;
//     var bears = yield Bear.find({}, function(e, d){
//       if(e) return e;
//       i = 1;
//       console.log('abc');
//     });
// console.log(123);
//     console.log(i)
// }

// var a = db();
// var c = a.next();
// console.log(c)

