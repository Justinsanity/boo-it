
/* db.js
 * express router of ch_boo_d.rb 
 */
 
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uristring = 'mongo://localhost:27017/Boo';

var Content = new schema({
    from : String,
    to   : String,
    datetime: Date,
    content : String
});
var dialog = new schema({		// define schema for wait table
    did   : String,             // dialog id
    dialog: [Content]
});

mongoose.model('dialog', dialog);	// register model
mongoose.connect(uristring, function(err, res){ // connect with uri
  if(err) { 
    console.log('ERROR connected to: ' + uristring);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});
