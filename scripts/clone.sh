#! /bin/bash

echo "where do you want to clone?"
read -p 'path: [default .] ' path

path=${path:-.}
git clone git@github.com:sooohka/ts-node-starter $path
rm -rf .git