
/* db.js
 * express router of ch_boo_d.rb 
 */
 
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uristring = 'mongodb://localhost:27017/Boo';

var Content = new schema({
    from : String,
    to   : String,
    datetime: Date,
    content : String
});
var Dialog = new schema({		// define schema for wait table
    did   : String,             // dialog id
    dialog: [Content]
});
mongoose.model('dialogs', Dialog);	// register model


var Account = new schema({
    uid     : String,
    username: String,
    password: String,   // tmp
    friends : Array
});
mongoose.model('accounts', Account);

mongoose.connect(uristring, function(err, res){ // connect with uri
  if(err) { 
    console.log('ERROR connected to: ' + uristring);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});
