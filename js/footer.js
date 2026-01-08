const insertFooter = () => {
	const year = new Date().getFullYear();
	const copyrightStr = `Dragonrip Player Index | Community player list for browser game www.dragonrip.com <br> © ${year} chazu.arkku.net / by player paxu`;
	const copyrightElem = document.createElement('div');
	copyrightElem.innerHTML = copyrightStr;

	const contactLink = document.createElement('address');
	contactLink.innerHTML = '<i class="fas fa-envelope"></i> <a href="mailto:markus.vaananen(at)gmail.com">contact</a>';

	const poweredBy = document.createElement('div'); 
	poweredBy.innerHTML = 'Powered by <a href="https://www.arkku.net/" target="_blank">arkku.net</a>';


	const footerElem = document.createElement('div');
	footerElem.id = 'footer';
	footerElem.appendChild(copyrightElem);
	footerElem.appendChild(contactLink);
	footerElem.appendChild(poweredBy);

	document.body.appendChild(footerElem);
}
insertFooter();