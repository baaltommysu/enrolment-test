/******************************************************************************
 * 
 * PZH starts up, enroll with the Google account.
 * 
 *
 * Tao Su, Politecnico di Torino.
 * 
 ******************************************************************************/

var Browser = require("zombie");
var assert = require("assert");

if(process.argv.length < 4) {
    console.error("argument missing");
    console.log("Usage:node enrolment-test-pzh.js <Google account> <Google account passwd> <Google account firstname surname>")
    process.kill();
}

var email = process.argv[2];
var passwd = process.argv[3];
var fullname = process.argv[4];

var expect = "name: " + fullname.toLowerCase() + " email: "+ email + "@gmail.com";

//console.log("the email is ", email);
//console.log("the pw is ", passwd);
//console.log("the expect is ", expect);

browser = new Browser();

browser.runScript = true;
browser.loadCSS = true;
browser.maxRedirects = 10;


browser.visit("https://localhost", function(){
    assert.equal(browser.text("title"),"PZH Login");
    console.log("\n\n[PZH]-->Shows the webpage of PZH login");

    browser.pressButton("input[value~='Google']", function(){
	assert.equal(browser.text("title"),"Google Accounts");
	console.log("\n\n[PZH]-->Starting filling the data of Google Account!");
	browser.fill("Email",email);
	browser.fill("Passwd",passwd);
	browser.uncheck("PersistentCookie");
	browser.pressButton("input#signIn",function(){
//	    assert.equal(browser.text("title"), "PZH Login");
//	    console.log("\n\n the title of this page is ", browser.text("title"));

	    console.log("\n\n[PZH]-->Data is filled and sign in pressed");

	    if(browser.text("title")!="PZH Login")
	    {
		console.log("\n\nWe are in the approve phase!");
		browser.pressButton("input#submit_approve_access",function(){
		    browser.pressButton("input[value~='Sign']",function(){
			console.log("\n\n[PZH]-->Sign up pressed");
		    
			assert.equal(browser.text("div.module_content").toLowerCase(),expect);
			console.log("\n\n[PZH]-->Enrolment is finished!");
		    });
		});
		
	    } else {
		console.log("\n\nWe have already passed the approve phase!");
		browser.pressButton("input[value~='Sign']",function(){
		    console.log("\n\n[PZH]-->Sign up pressed");
		    
		    assert.equal(browser.text("div.module_content").toLowerCase(),expect);
		    console.log("\n\n[PZH]-->Enrolment is finished!");
		    
		});
		
	    }
	});
    });

});
