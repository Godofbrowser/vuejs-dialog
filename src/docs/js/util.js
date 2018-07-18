export const popupWindow = (href, network) => {
	const networks = {
		facebook : { width : 600, height : 300 },
		twitter  : { width : 600, height : 254 },
		googleplus   : { width : 515, height : 490 },
		linkedin : { width : 600, height : 473 }
	}
	const options = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,';
	return window.open(href, '', options + 'height=' + networks[network].height + ',width=' + networks[network].width);
}
