Enrolment test
===

This task is to build an enrolment test process which integrate with Jenkins Continuou Integration server.

These files are automatically downloaded to the slave machines of the Jenkins server. In case PZH need root privilege, it need to set the user account to execute the commands without asking the passwd. 

Pzh and Pzp runs on different machines.
For pzh, the task is simple, it only need to turn on pzh and wait.
For pzp, the task is more complicated, it need to start pzp, enroll to the pzh.

Working procedure
===
1st step. The jenkins master clears the old directories, downloads the new source code of the pzp and pzh from github.com
2nd step. The jenkins master runs the build process of both the source code
(the commands are in enrol-test-jenkins.sh)
3rd step. If the build succeeds, the jenkins master gives the signals (signals.sh) to the other two machines (pzh and pzp hosts) to download the code of enrolment-test from github.com, and execute the enrol-pzh.sh and enrol-pzp.sh scripts from downloaded files.
4th step. The machine hosts pzh executes the enrol-pzh.sh, in this script, it need to do the following operations:
    1st, clear the old stored information from the last test. (delete the directories of webinos-pzh and .webinosPzh);
    2nd, download the new source code of pzh from the github.com;
    3rd, install the pzh;
    4th, start the pzh and wait for the pzp to enroll;
    5th, after 600 seconds, it will kill the process of pzh.
5th step. The machine hosts pzp executes the enrol-pzp.sh, in this script, it will execute the following operations:
    1st, clear the old stored information from the last test.(Ex. delete the directories of webinos-pzp and .webinos);
    2nd, download the new source code of pzp from the github.com;
    3rd, install the pzp;
    4th, start the pzp and when the pzp is initialised, use zombiejs to test the enrolment;
    5th, in the code of enrolment-test-pzp, it need to open a webpage, goes to the testbed of pzp, clicks on the enrol device link, inserts the ip address of the pzh, fills the data of Google account, and clicks the sign up button. 
    6th, after 600 seconds, it will kill the process of pzp.
6th step. At this point, the enrolment process succeeds, if any error happens during the steps listed above, the jenkins master will show the test to be failure.

I have set the test executes every night, around 3 a.m., but it can be set according to the requirement.


Motivation & Problems.
===
Motivation:
	In this test, no framework is used, because I think it is not necessary to use the framework at all, in the zombiejs, it contains the function called assert, which can compare the certain content of the webpage with expected strings, for example, it can compare the content of the title of the webpage with "PZP Dashboard", if this comparison doesn't match, the enrolment process will stop, and a failure will show in the end of the jenkins log. In this way, we can already see if the test succeeds or fails.

Problems: 
	The code's structure is complex, because of security reasons, for example, I have to isolated the code for signaling the two linux boxes to start the test, because the ip address of the linux boxes are in this snippet of code. 
	For the machine hosts pzh, it needs root privilege to start the pzh and remove the .webinosPzh directory, it has to set the user does not need to be asked for the password even he calls the "sudo" function.
	In the enrolment process, zombie can not execute the click of "Enroll Device" correctly, I have to invoke the webpage of enroll device directly.
	In the last phase of the enrolment test, zombie can not redirect to the PZP Dashboard, but halt in the PZP enrolment webpage (just as firefox would do), but from the console log, it shows the connection has established. This problem would affect the further tests, since they may start after the enrolment and also they may need to interact with the webpage of "PZP Dashboard".
