#!/bin/bash

# concats and minifies js files in 'js/ui' and 'js/app' folders


cd ../js/ui
gulp clean concat uglify


cd ../../css
gulp clean concat minify-css


cd ../js/app
browserify main.js -o build/raw-main-bundle.js --debug --verbose
gulp clean compress
watchify main.js -o build/raw-main-bundle.js --debug --verbose