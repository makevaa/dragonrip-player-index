// main.js

const log = console.log;
const mobileViewTreshold = 650;
const viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

let mobileView = false;
if (viewportW < mobileViewTreshold) {
	mobileView = true; //console.log("mobileView = true, viewportW: "+viewportW+)
}	


class Player { 
	constructor(name, id) {
		this.name = name;
		this.id = id; 
		this.url = `https://dragonrip.com/game/who.php?wr=${id}`;
	}
}

class Clan { 
	constructor(name, id, factionIndex) {
		this.name = name;
		this.id = id; 
		this.factionIndex = factionIndex;
		this.url = `https://dragonrip.com/game/clanm.php?wr=${id}`;
	}
}

const players = [];
const clans = [];


const processRawDataPlayer = str => {	
	const arrRaw = str.split("\n")
	const lineArr = [];

	for (const line of arrRaw) {
		// if line doesnt start with "//", we use it
		if (line.trim().length > 0 && line.trim().substring(0,2) !== '//') {
			lineArr.push(line);
		}
	}
	
	for (const line of lineArr) {
		const data = line.split("|")

		const name = data[0].trim();
		const id = data[1].trim();

		const player = new Player(name, id);
		players.push(player);
	} 	

	// Sort players alphabetically, ignore case
	players.sort((a, b) => a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'}));

	checkDuplicateData(players);
}


const processRawDataClan = str => {	
	const arrRaw = str.split("\n")
	const lineArr = [];

	for (const line of arrRaw) {
		// if line doesnt start with "//", we use it
		if (line.trim().length > 0 && line.trim().substring(0,2) !== '//') {
			lineArr.push(line);
		}
	}
	
	for (const line of lineArr) {
		const data = line.split("|")

		const name = data[0].trim();
		const id = data[1].trim();
		const factionIndex = data[2].trim();

		const clan = new Clan(name, id, factionIndex);
		clans.push(clan);
	} 	

	// Sort players alphabetically, ignore case
	clans.sort((a, b) => a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'}));

	checkDuplicateData(clans);
}


const setPlayerCount = () => {
	const target = document.querySelector('#player-count-cont > .player-count');
	target.innerHTML = `${players.length}`;
}

const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// Log to console possible duplicate players in data
const checkDuplicateData = (data) => {
	const namesChecked = [];

	for (const item of data) {
		const name = item.name;

		if (!namesChecked.includes(name)) {
			namesChecked.push(name);
		} else {
			log(`Duplicate data found: ${name}`);
		}
	}
}


const buildItems = () => {
	//createCategoryLists();
	

	// Build player list
	for (let i = 0; i < players.length; i++) { 	
		const target = document.getElementById('player-list');
		const player = players[i];

		const item = document.createElement('a');
		item.classList.add('item');
		item.setAttribute('href', player.url);
		item.setAttribute('target', '_blank');
		item.setAttribute('data-filter-string', player.name.toLowerCase());

		const name = document.createElement('div');
		name.classList.add('name');
		name.innerText = player.name;

		const id = document.createElement('div');
		id.classList.add('id');
		id.innerText = player.id;

		item.append(name);
		item.append(id);

		target.append(item);	
	}

	// Build clan list
	for (let i = 0; i < clans.length; i++) { 	
		const target = document.getElementById('clan-list');
		const clan = clans[i];

		const item = document.createElement('a');
		item.classList.add('item');
		item.setAttribute('href', clan.url);
		item.setAttribute('target', '_blank');
		item.setAttribute('data-filter-string', clan.name.toLowerCase());

		const name = document.createElement('div');
		name.classList.add('name');
		name.innerText = clan.name;

		// Add color class based on faction
		let factionColorClass = 'protectors'
		if (clan.factionIndex === 1 || clan.factionIndex === '1') 
			factionColorClass = 'legion';

		name.classList.add(factionColorClass);

		const id = document.createElement('div');
		id.classList.add('id');
		id.innerText = clan.id;

		item.append(name);
		item.append(id);

		target.append(item);	
	}
}	

const showList = (cssClass) => {
	const listPlayer = document.getElementById('player-list');
	const listClan = document.getElementById('clan-list');
	const buttonPlayer = document.querySelector('#top-buttons > .button.player')
	const buttonClan = document.querySelector('#top-buttons > .button.clan')

	// Reset styles
	listPlayer.classList.add('hidden');
	listClan.classList.add('hidden');
	buttonPlayer.classList.remove('selected');
	buttonClan.classList.remove('selected');

	// Set correct styles
	const listToShow = document.querySelector(`#content > .list.${cssClass}`);
	listToShow.classList.remove('hidden');
	const selectedButton = document.querySelector(`#top-buttons > .button.${cssClass}`);
	selectedButton.classList.add('selected');
}




const setListeners = () => {

	const buttonPlayers = document.querySelector('#top-buttons > .button.player');
	const buttonClans = document.querySelector('#top-buttons > .button.clan');

	buttonPlayers.addEventListener('click', e => {
		showList('player');
	});

	buttonClans.addEventListener('click', e => {
		showList('clan');
	});


	const itemList = document.getElementById('player-list');

	itemList.addEventListener('click', e => {
		const target = e.target;

		if (target.classList.contains('item')) {
			

			if (target.classList.contains('selected')) {
				// Clicked the selected item again, remove selection
				
			} else {
				// Clicked non-selected item, select it
				//clearSelection();
				//const i = target.getAttribute('data-index');
				//selectMovie(i);
			}
			
			//log(target);
		}
	});


}

processRawDataPlayer(playerDataRaw);
processRawDataClan(clanDataRaw);

//log(players);

buildItems();
setPlayerCount();
setListeners();

showList('player');