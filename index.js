'use strict';

var Report 			= require("./cucumber-html-report.js"); 	//Custom report generator file.
var templateBuilder	= require('./builder/template_builder');	//Default template generator file

// file name configuration
var date 	= new Date;
var seconds = date.getSeconds();
var minutes = date.getMinutes();
var hour 	= date.getHours();
var year 	= date.getFullYear();
var month 	= date.getMonth();
var day 	= date.getDate();
var name 	= "report_".concat(year, month, day, "_", hour, minutes, seconds, ".html");

var options = {
	// source json
	source:     	"./cucumber_report.json",
	// target directory (will create if not exists)
	dest:       	"./reports",
	// report file name (will be index.html if not exists)
	name:       	name,
	// your custom mustache template (uses default if not specified)
	template:   	"./extended_template.html",
	// Title for default template. (default is Cucumber Report)
	title:      	"Cucumber Report",
	// Subtitle for default template. (default is empty)
	component:  	"My Component",
	// Path to the displayed logo.
	logo:       	"./logos/cucumber-logo.svg",
	// Path to the directory of screenshots. Optional.
	screenshots:    "./screenshots",
	// Display D3,js charts related to the report json file. Optional. Default value is true.
	displayCharts:  true
};

var report 		= new Report(options);
var template 	= new templateBuilder(report);

template.init();
