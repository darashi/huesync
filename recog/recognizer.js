var spawn = require('child_process').spawn;

var juliusDir = '/usr/local/opt/julius-dictation-kit';
var opt_h = juliusDir + '/share/model/phone_m/hmmdefs_ptm_gid.binhmm';
var opt_hlist = juliusDir + '/share/model/phone_m/logicalTri';

var julius = spawn('julius', [
  '-w', 'color.dict',
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
  }
//  console.log('RECEIVED: [%s]', data);
});

julius.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
