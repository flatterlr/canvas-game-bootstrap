"use strict"

var app = app || {}; 

window.onload = function() {
	console.log("page loaded"); 
	
	resources.load([
		'img/runCycle.png',
		'img/idleAnim.png',
	]); 
	resources.onReady(app.brawler.init); 
}