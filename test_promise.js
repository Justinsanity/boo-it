    var i = 0;
var p = new Promise(function(res, rej){
    for(; i<10000; i++){
     res(i);
    }
});

p.then(function(value){console.log('abc'); value++;}, function(e){console.log(e)});

console.log('123');