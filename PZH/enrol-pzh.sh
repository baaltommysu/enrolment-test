#!/bin/bash
sudo killall node
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
export WEBINOS_PZH=$TMP/webinos-pzh
export TEST_DIR=~/enrolment-test/PZH



# clear all the old data
cd ~
sudo rm -fr .webinos .webinosPzh

cd $TMP
echo "[PZH]-->In the temporary directory $TMP"


# Empty it, and check out the PZP
if [ -d "$WEBINOS_PZH" ]; then
  rm -rf $WEBINOS_PZH
fi

echo "[PZH]-->All set for PZH!"

git clone https://github.com/webinos/webinos-pzh.git $WEBINOS_PZH
cd $WEBINOS_PZH
# Install the pzh 
npm install --save-dev
echo "[PZH]-->Installed the PZH"


# Start PZH
sudo ./webinos_pzh.js & 

echo "[PZH]-->PZH started!"

# Copy test files to pzh directory
mkdir $WEBINOS_PZH/test-tmp
cp $TEST_DIR/* $WEBINOS_PZH/test-tmp
echo "[PZH]-->Copied the test files"

sleep 15
#cd $WEBINOS_PZH/test-tmp
#echo "[PZH]-->Start the enrolment"
#node enrolment-test-pzh.js webinosg webinostest "G webinos" &


sleep 600








