#!/bin/bash

cd ..
tar cvzf node-compression/nodejs_test.tar.gz --exclude=".git" --exclude="zip.sh" --exclude="*.gz" node-compression/
