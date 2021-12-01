#! /bin/bash
COMPLETE_VERSION_FOLDER=$(node -pe "require('./package.json').version")
MAIN_VERSION_FOLDER=${COMPLETE_VERSION_FOLDER%%.*}
mkdir -p ./build/$MAIN_VERSION_FOLDER && cp ./build/$COMPLETE_VERSION_FOLDER/* ./build/$MAIN_VERSION_FOLDER/
echo "Build is copied to main version folder 🤞"