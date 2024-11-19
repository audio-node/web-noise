#!/bin/sh
generator_dir=$(dirname "$(realpath "$0")")

basedir=$(pwd)

out_dir=$basedir/$1

cd $generator_dir
hygen node-generator new --dir=$out_dir
