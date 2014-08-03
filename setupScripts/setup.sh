#!/bin/bash
# Prerequisite: nodejs

# This script needs to be run when package.json in any folder changes

cd ../js/ui
npm install

cd ../../css
npm install

cd ../js/app
npm install