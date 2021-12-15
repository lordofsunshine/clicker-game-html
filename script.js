

const rewardRate = 1.1;
const xpRate = 1.7; // might have to lower this back down


var allTimeClicks = 0;
var bucks = 100;
var mult = 1;
var cps = 0;

var level = 1
var nextLevelReward = 200

var xp = 0;
var neededXP = 100;

var shortenNumbers = true;
var hold = false;

var showAll = false;
var alerts = false;

var myIDS = [];




// -- figure out save and stuff later


update()

restore()



function reset() {
	if (confirm("Are you sure you want to reset? ")) {
		allTimeClicks = 0;
		bucks = 100;
		mult = 1;
		cps = 0;
		level = 1;
		nextLevelReward = 200;
		xp = 0;
		neededXP = 100;
		showAll = false
		save();
	}
}
function save() {
	localStorage.setItem("atc",allTimeClicks)
	localStorage.setItem("bucks",bucks)
	localStorage.setItem("mult",mult)
	localStorage.setItem("cps",cps)
	localStorage.setItem("level",level)
	localStorage.setItem("nlr",nextLevelReward)
	localStorage.setItem("xp",xp)
	localStorage.setItem("neededXP",neededXP)
	localStorage.setItem('save', 'true');
	localStorage.setItem('showAll',showAll);
	localStorage.setItem('alerts', alerts);
}

function restore() {
	if (localStorage.getItem('save') == 'true') {
		data = localStorage.getItem('user_data');

		allTimeClicks = +localStorage.getItem('atc')
		bucks = +localStorage.getItem('bucks')
		mult = +localStorage.getItem('mult')
		cps = +localStorage.getItem('cps')
		level = +localStorage.getItem('level')
		nextLevelReward = +localStorage.getItem('nlr')
		xp = +localStorage.getItem('xp')
		neededXP = +localStorage.getItem('neededXP')
		showAll = localStorage.getItem('showAll')
		alerts = localStorage.getItem('alerts')
		if (showAll == 'false') {
			showAll = false;
		} else {
			showAll = true;
			let button = document.getElementById('show-all');
			button.classList.remove("off");
			button.classList.add("on");
		}
		if (alerts == 'false') {
			alerts = false;
		} else {
			alerts = true;
			let button = document.getElementById('alerts');
			button.classList.remove("on");
			button.classList.add("off");
		}
	}
}


function getNum(num) {
	if (shortenNumbers) {
		let numStr = ""+num;
		var finalString = "";
		var count = 0;
		for (var i=numStr.length-1; i>-1; i--) {
			if (count == 3) {
				count = 0;
				finalString += ','+numStr[i];
			} else {
				finalString += numStr[i];
			}
			count ++;
		}
		return finalString.split("").reverse().join("");
	} else {
		return num
	}
}

function update() {
	document.getElementById('user-clicks').innerHTML = getNum(allTimeClicks);
	document.getElementById('user-bucks').innerHTML = getNum(bucks);
	document.getElementById('user-mult').innerHTML = getNum(mult);
	document.getElementById('user-cps').innerHTML = getNum(cps);
	document.getElementById('user-level').innerHTML = getNum(level);
	document.getElementById('next-level-reward').innerHTML = getNum(nextLevelReward);
	document.getElementById('xp').innerHTML = getNum(xp);
	document.getElementById('needed-xp').innerHTML = getNum(neededXP);
	
	var percent = Math.round((xp/neededXP)*100);
	document.getElementById('xp-var-value').style.width = percent+'%';

	updateUpgradeAvailability()
	
}
function showAllUpgrades() {
	if (!showAll) {
		showAll = true;
		let button = document.getElementById('show-all');
		button.classList.remove("off");
		button.classList.add("on");
	} else {
		showAll = false;
		let button = document.getElementById('show-all');
		button.classList.remove("on");
		button.classList.add("off");
	}
}
function removeAlerts() {
	if (!alerts) {
		alerts = true;
		let button = document.getElementById('alerts');
		button.classList.remove("on");
		button.classList.add("offf");
	} else {
		alerts = false;
		let button = document.getElementById('alerts');
		button.classList.remove("off");
		button.classList.add("on");
	}
}
function updateUpgradeAvailability() {
	let available = [];
	var all = ['u-one', 'u-two', 'u-three', 'u-four', 'u-five', 'u-six', 'u-seven', 'u-eight', 'u-nine', 'u-ten', 'u-eleven', 'u-twelve', 'u-thirteen', 'u-fourteen', 'u-fifteen', 'u-sixteen', 'u-seventeen'];
	var amount = parseInt(document.getElementById('amount').value);
	if (bucks < 100*amount) {
		document.getElementById('no-upgrades-message').style.display = 'block';
	} else {
		document.getElementById('no-upgrades-message').style.display = 'none';
	}
	if (bucks >= 100*amount) {
		available.push('u-one');
		available.push('u-two');
	}
	if (bucks >= 150*amount) {
		available.push('u-three');
	}
	if (bucks >= 200*amount) {
		available.push('u-four');
	}
	if (bucks >= 800*amount) {
		available.push('u-five')
	}
	if (bucks >= 1000*amount) {
		available.push('u-six')
	}
	if (bucks >= 1500*amount) {
		available.push('u-seven')
	}
	if (bucks >= 5000*amount) {
		available.push('u-eight')
	}
	if (bucks >= 20000*amount) {
		available.push('u-nine')
	}
	if (bucks >= 50000*amount) {
		available.push('u-ten')
	}
	if (bucks >= 80000*amount) {
		available.push('u-eleven')
	}
	if (bucks >= 150000*amount) {
		available.push('u-twelve')
	}
	if (bucks >= 300000*amount) {
		available.push('u-thirteen')
	}
	if (bucks >= 500000*amount) {
		available.push('u-fourteen')
	}
	if (bucks >= 1000000*amount) {
		available.push('u-fifteen')
	}
	if (bucks >= 10000000*amount) {
		available.push('u-sixteen')
	}
	if (bucks >= 10000000*amount) {
		available.push('u-seventeen')
	}
	if (!showAll) {
		for (var i=0; i<all.length; i++) {
			var item = all[i]
			if (available.includes(item)) {
				document.getElementById(item).style.display = 'inline-block';
			} else {
				document.getElementById(item).style.display = 'none';
			}
		}
	} else {
		for (var i=0; i<all.length; i++) {
			var item = all[i];
			if (available.includes(item)) {
				document.getElementById(item).style.display = 'inline-block';
				document.getElementById(item).classList.remove('grayed-out');
			} else {
				document.getElementById(item).style.display = 'inline-block';
				document.getElementById(item).classList.add('grayed-out');
			}
		}
	}
}

function clickActions() {
	xp += mult;
	allTimeClicks += mult;
	if (xp >= neededXP) {
		nextLevel();
	}
	update();
}

function nextLevel() {
	level ++;
	xp = 0;
	bucks += nextLevelReward;
	nextLevelReward = Math.round(nextLevelReward+((100*level)*(rewardRate)));
	neededXP = Math.round(neededXP+((100*level)*xpRate));
}

function openUpgrades() {
	document.getElementById('upgrades').style.display = 'block';
}
function closeUpgrades() {
	document.getElementById('upgrades').style.display = 'none';
}
function openSettings() {
	document.getElementById('settings').style.display = 'block';
}
function closeAndSaveSettings() {
	document.getElementById('settings').style.display = 'none';
	// finish this later...
}


function upgrade(cost, m1, c1) {
	var amount = parseInt(document.getElementById('amount').value);
	cost = cost*amount;
	if (bucks >= cost) {
		bucks -= cost;
		mult += m1*amount
		cps += c1*amount
		update()
		if (alerts) {ping("Purchase Succesful!");}
	} else {
		alert("You need more Bucks!");
	}
}

function ping(text) {
	var div = document.createElement('div');
	var id = Math.floor(Math.random()*10000)
	if (myIDS.includes(id)) {
		id = Math.floor(Math.random()*1000000)
	}
	div.id = id;
	div.innerHTML = `<div class='close-alert' onclick='document.getElementById("${id}").outerHTML="";myIDS.pop(${id})'>X</div><h1>${text}</h1>`;
	myIDS.push(id);
	div.classList.add('alert-banner')
	document.body.appendChild(div);
	setTimeout(function() {
		document.getElementById(id).outerHTML = "";
	}, 1500)
}

document.addEventListener("mouseup", function(event) {
	hold = false;
})
setInterval(function(){
	if (hold) {
		clickActions();
	}
}, 200) // slow this down a bit

setInterval(function(){
	save();
}, 2000)

setInterval(function(){
	allTimeClicks += cps;
	xp += cps;
	if (xp >= neededXP) {
		nextLevel();
	} 
	update();
}, 1000)