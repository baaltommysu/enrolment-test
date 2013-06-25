/******************************************************************************
 * 
 * PZP starts up, enroll to a PZH on another machine
 * 
 *
 * Tao Su, Politecnico di Torino.
 * 
 ******************************************************************************/


var Browser = require("zombie");
var assert = require("assert");


if(process.argv.length < 6) {
    console.error("argument missing");
    console.log("Usage:node enrolment-test-pzp.js <Google account> <Google account passwd> <Google account firstname surname> <IP address of PZH> <nickname>")
    process.kill();
}

var email = process.argv[2];
var passwd = process.argv[3];
var fullname = process.argv[4];
var ip = process.argv[5];
var nickname = process.argv[6];

var expect = "name: " + fullname.toLowerCase() + " email: "+ email + "@gmail.com";


browser = new Browser();

browser.runScripts = true;
browser.loadCSS = true;
browser.maxRedirects = 10;
browser.waitFor = 5000


browser.visit("http://localhost:8080/",function(){

    assert.equal(browser.text("title"), "PZP Dashboard");
   
//Here the best solution is click then redirect, but zombie is not working in this way.
    browser.clickLink("Enroll Device", function(){
	console.log("\n\n[PZP]-->clicked!");

// This is not the best solution, but it directly load to connectPzh.html, should come back and check again.
	browser.visit("http://localhost:8080/connectPzh.html", function(){
	    console.log("\n\n[PZP]-->Entering enrolment process!");
	    
	    browser.fill("input#own_pzh", ip);
	    browser.pressButton("input#connectPzh",function(){
		console.log("\n\n[PZP]-->Pressing button to log in!");
		browser.pressButton("input[value~='Google']",function(){
		    console.log("\n\n[PZP]-->Filling Google account data!");
		    browser.fill("Email", email);
		    browser.fill("Passwd", passwd);
//		    console.log("[TEST] email is", email, "passwd is", passwd);
		    browser.uncheck("PersistentCookie");

		    browser.pressButton("input#signIn",function(){		
//browser.viewInBrowser();
			console.log("\n\n[PZP]-->Sign in pressed");
			if(browser.text("title")!="PZH Login")
			{
				
				
			    console.log("\n\n[PZP]-->Google ask for approval");
			    browser.pressButton("input#submit_approve_access",function(){
				browser.fill("input#nickname", nickname);
				browser.pressButton("input[value~='Sign']",function(){
				    console.log("\n\n[PZP]-->Sign up pressed");
				    browser.pressButton("input[value~='Yes, please enrol this device']", function(){
					console.log("\n\n[PZP]-->The webpage we are in is " + browser.text("title"));
					assert.equal(browser.text("title"),"PZH Dashboard");
				    });
					
		    		});
			    });
			    
			} else {
			    browser.fill("input[name='nickname']", nickname);
			    browser.pressButton("input[value~='Sign']",function(){
				//here title is PZP enrollment, not PZP Dashboard, just like using firefox, the page is not redirected. But the connection is successful.
				console.log("\n\n[PZP]-->Sign up pressed");
				    
				browser.pressButton("input[value~='Yes, please enrol this device']", function(){
				    console.log("\n\n[PZP]-->The webpage we are in is " + browser.text("title"));
				    assert.equal(browser.text("title"),"PZH Dashboard");
				});
				    
			    });
				
				
			
			}		
		
		    });
		});
	    });
	});
	
    });
});