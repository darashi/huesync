var spawn = require('child_process').spawn;
var request = require('request');

var juliusDir = '/usr/local/opt/julius-dictation-kit';
var opt_w = __dirname + '/huesync.dict';
var opt_h = juliusDir + '/share/model/phone_m/hmmdefs_ptm_gid.binhmm';
var opt_hlist = juliusDir + '/share/model/phone_m/logicalTri';

var env = process.env;
var ENDPOINT = env.ENDPOINT || 'http://localhost:3000';

var julius = spawn('julius', [
  '-w', opt_w,
  '-h', opt_h,
  '-hlist', opt_hlist,
  '-input', 'mic',
  '-nolog',
  '-cutsilence'
]);

julius.stdout.on('data', function (data) {
  var str = data.toString();
  var match = str.match(/pass1_best: (.+)\n/)
  if (match) {
    var recognized = match[1];
    console.log('RECOGNIZED: %s', recognized);
    var url = ENDPOINT + '/colors/' + recognized;
    console.log('SENDING: %s', url);
    request.get(url);
  }
//  console.log('RECEIVED: [%s]', data);
});

julius.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
