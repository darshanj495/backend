const figlet = require('figlet');

figlet('Darshan Joshi', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.log(err);
        return;
    }
    console.log(data);
});