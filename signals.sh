#!/bin/bash

#xxx.xxx.xxx.xxx is the ip address of the host of pzp
ssh -t tao@xxx.xxx.xxx.xxx 'bash -s' < /home/tao/enrolment-test/test-pzp.sh &

#xxx.xxx.xxx.xxx is the ip address of the host of pzh
ssh -t tao@xxx.xxx.xxx.xxx 'bash -s' < /home/tao/enrolment-test/test-pzh.sh
