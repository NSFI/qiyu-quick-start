var gulp = require('gulp');
var execSync = require('child_process').execSync;
var del = require('del');

gulp.task('build', function() {
    execSync('node scripts/build.js')
})

gulp.task('package', ['build'], function() {
    del(['outApp']);
    execSync('electron-packager ./ qiyu-quick-start --icon=./bitbug-small.ico --platform=win32 --arch=x64 --out=./outApp --overwrite --electron-version=2.0.8 --ignore="node_modules/*"');
})

gulp.task('packagemac', ['build'], function() {
    del(['outAppMac']);
    execSync('electron-packager ./ qiyu-quick-start --icon=./bitbug-small.icns --platform=darwin --arch=x64 --out=./outAppMac --overwrite --electron-version=2.0.8');
})

gulp.task('default', ['build', 'package']);
