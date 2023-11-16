#!/bin/sh
generator_dir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

basedir=$(pwd)

out_dir=$basedir/$1

cd $generator_dir
./node_modules/.bin/hygen node-generator new --dir=$out_dir
