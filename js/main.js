


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

		//https://dragonrip.com/game/who.php?wr=7800
		
	}
}

const players = []


const processRawData = str => {	
	var arrRaw = str.split("\n")
	var lineArr = [];

	for (const line of arrRaw) {
		// if line doesnt start with "//", we use it as a comment
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

	checkDuplicateData();
}


const setPlayerCount = () => {
	const target = document.querySelector('#player-count-cont > .player-count');
	target.innerHTML = `${players.length}`;
}

const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// Log to console possible duplicate players in data
const checkDuplicateData = () => {
	const namesChecked = [];

	for (const player of players) {
		const name = player.name;

		if (!namesChecked.includes(name)) {
			namesChecked.push(name);
		} else {
			log(`Duplicate player found: ${name}`);
		}

	}
}


const buildItems = () => {
	//createCategoryLists();
	const target = document.getElementById('list');

	for (let i = 0; i < players.length; i++) { 	
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
}	




const setListeners = () => {
	const itemList = document.getElementById('list');

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

processRawData(playerDataRaw);

//log(players);

buildItems();
setPlayerCount();
setListeners();
