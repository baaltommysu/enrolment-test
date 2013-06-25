#!/bin/bash

################################################################################
#  Code contributed to the webinos project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Copyright 2013 Tao Su, Politecnico di Torino
################################################################################
# fail if anything fails
set -e

export TMP=~/tmp
export WEBINOS_PZP=$TMP/webinos-pzp
export TEST_DIR=~/enrolment-test/PZP



# clear all the old data
cd ~
sudo rm -fr .webinos .webinosPzh

cd $TMP
echo "[PZP]-->In the temporary directory $TMP"

# Empty it, and check out the PZP
if [ -d "$WEBINOS_PZP" ]; then
  rm -rf $WEBINOS_PZP
fi
# Empty it, and check out the PZP
if [ -d "$WEBINOS_PZH" ]; then
  rm -rf $WEBINOS_PZH
fi

echo "[PZP]-->All set for PZP!"

git clone https://github.com/webinos/webinos-pzp.git $WEBINOS_PZP
cd $WEBINOS_PZP
# Install the pzp 
npm install --save-dev
echo "[PZP]-->Installed the PZP"


# Start PZP
./webinos_pzp.js & 
echo "[PZP]-->PZP started!"

# Copy test files to pzh directory
mkdir $WEBINOS_PZP/test-tmp
cp $TEST_DIR/* $WEBINOS_PZP/test-tmp
echo "[PZP]-->Copied the test files"

sleep 50
cd $WEBINOS_PZP/test-tmp
echo "[PZP]-->Start the enrolment"
# "Usage:node enrolment-test-pzp.js <Google account> <Google account passwd> <Google account firstname surname> <IP address of PZH> <nickname>"
node enrolment-test-pzp.js webinosg webinostest "G webinos" xxx.xxx.xxx.xxx tao &


sleep 600
killall node







