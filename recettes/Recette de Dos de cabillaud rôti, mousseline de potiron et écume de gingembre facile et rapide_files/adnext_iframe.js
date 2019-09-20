var ADVERLINE_PARENT = {};
try { ADVERLINE_PARENT = parent.ADVERLINE;} catch(e){}

var ADVERLINE = window.ADVERLINE || {};

ADVERLINE.getDocument = ADVERLINE.getDocument || function(el) {
	return el.contentDocument || el.contentWindow.document;
}
	
ADVERLINE.iframeFill = ADVERLINE.iframeFill || function (iframeId,content) {
	//console.log("iframeFill: "+iframeId);
	if (iframeId == 'adv_ifr_footer') {
		try { content = decodeURIComponent(content);} catch(e){}
	}

	iframeElement = document.getElementById(iframeId);
	iframeDocument = ADVERLINE.getDocument(iframeElement);
	iframeDocument.open();
	iframeDocument.write([
		'<!doctype html><html><head></head><body marginwidth="0" marginheight="0"><script type="text/javascript">',
		content,
		'	\n if(typeof parent.ADVERLINE.adnext_flags == \'undefined\') { parent.ADVERLINE.adnext_flags = {};}',
		'	parent.ADVERLINE.adnext_flags["f_'+iframeId+'"] = 1;',
		'</scr'+'ipt></body></html>'
	].join(""));
	iframeDocument.close();
	
	ADVERLINE.reloadResize(iframeId);
}
 
ADVERLINE.getDimensions = ADVERLINE.getDimensions ||function(e) {
	var view = e.ownerDocument.defaultView;

	if (!view || !view.opener) {
		view = window;
	}

	var styles = view.getComputedStyle(e);

	var getDimension = function(val, prop) {
		if (val <= 0 || !val) {
			val = styles ? styles.getPropertyValue(prop) || styles[prop] : undefined;

			if (val < 0 || !val) {
				val = e.style[prop];
			} 
			
			if (val != '100%') {
				val = parseFloat(val) || 0;
			}
		}

		return val;
	}

	return [ getDimension(e.offsetWidth, "width"), getDimension(e.offsetHeight, "height") ];
}

ADVERLINE.setIframeSize = ADVERLINE.setIframeSize || function(iframeId,width,height) {
	//console.log("setIframeSize: "+iframeId+" "+width+"x"+height);
	var iframe = document.getElementById(iframeId);
	iframe.setAttribute("width", width);
	iframe.setAttribute("height", height);
	ADVERLINE.stopResize(iframeId);

	newSize = { width: width, height: height };
	ADVERLINE[iframeId].lastSize = newSize;

	if (typeof window["resize_" + iframeId] === "function") {
		console.log("resize_" + iframeId + " callback");
		window["resize_" + iframeId](newSize.width, newSize.height);
	} else if (typeof window.top["resize_" + iframeId] === "function") {
		console.log("resize_" + iframeId + " callback");
		window.top["resize_" + iframeId](newSize.width, newSize.height);
	}
}

ADVERLINE.stopResize = ADVERLINE.stopResize || function(iframeId) {
	//console.log("stopResize: "+iframeId);
	try {
		clearInterval(ADVERLINE[iframeId].adnext_timer);
		clearTimeout(ADVERLINE[iframeId].adnext_timeout);
	} catch(e){}
	
	ADVERLINE.verifyVisibility(iframeId);
}

ADVERLINE.verifyVisibility = ADVERLINE.verifyVisibility || function(iframeId) {
	//TESTING
	/*var iframe = document.getElementById(iframeId);
	if(iframe.getAttribute("height") <= 0)
		iframe.style.display = "none";
	else
		iframe.style.display = "initial";*/
}

ADVERLINE.reloadResize = ADVERLINE.reloadResize || function(iframeId) {
	ADVERLINE.stopResize(iframeId);
	//console.log("reloadResize: "+iframeId);
	try {
		ADVERLINE[iframeId].adnext_timer = setInterval((function() {
			ADVERLINE.autoResize(iframeId);
		}), 50);
		ADVERLINE[iframeId].adnext_timeout = setTimeout((function() {
			try { clearInterval(ADVERLINE[iframeId].adnext_timer);} 
			catch(e){}
		}), 8000);
	} catch(e){}
}

ADVERLINE.autoResize = ADVERLINE.autoResize || function(id) {
	var iframe = document.getElementById(id);

	if (iframe !== null) {
		var iframeDoc = ADVERLINE.getDocument(iframe),
		tags = [ "a", "canvas", "div", "embed", "iframe", "img", "ins", "li", "object", "ol", "span", "ul", "video" ],
		newSize = { width: 0, height: 0 },
		width = 0, height = 0,
		i, j, el, size;

		for (i = 0; i < tags.length; i++) {
			el = iframeDoc.getElementsByTagName(tags[i]);

			for (j = 0; j < el.length; j++) {
				if (el[j].getAttribute("id") === "advskin_divzero") {
					newSize = { width: 0, height: 0 };
					break;
				}

				size = ADVERLINE.getDimensions(el[j]);

				width = size[0];
				height = size[1];

				if (tags[i] == "img" && width === 1) {
					el[j].style.display = "none";
				}

				newSize.width = Math.max(width, newSize.width);
				newSize.height = Math.max(height, newSize.height);
			}
		}

		if (typeof ADVERLINE[id].lastSize !== "undefined" && (ADVERLINE[id].lastSize.width !== newSize.width || ADVERLINE[id].lastSize.height !== newSize.height)) {
			iframe.setAttribute("width", newSize.width);
			iframe.setAttribute("height", newSize.height);
			ADVERLINE[id].lastSize = newSize;
			ADVERLINE.verifyVisibility(id);

			if (typeof window["resize_" + id] === "function") {
				console.log("resize_" + id + " callback");
				window["resize_" + id](newSize.width, newSize.height);
			} else if (typeof window.top["resize_" + id] === "function") {
				console.log("top resize_" + id + " callback");
				window.top["resize_" + id](newSize.width, newSize.height);
			}
		}
	}
}

ADVERLINE.insLoad = ADVERLINE.insLoad || function() {
	var insplcs = document.querySelectorAll("ins[data-src*='//adnext.fr']");
	var src_reg = new RegExp(/[\?&]plc=([^\?&]+)/);
	var plc;
	for (i = 0; i < insplcs.length; i += 1) {
		plc = src_reg.exec(insplcs[i].attributes["data-src"].value)[1];
		if (parseInt(plc) > 0) {
			insplcs[i].id = "adv_" + plc;
			ADVERLINE.writeIframe(1, 1, "adv_ifr_" + plc, "", insplcs[i]);
		}
	}
}

ADVERLINE.insLoadByPlc = ADVERLINE.insLoadByPlc || function(plc) {
	var insplc = document.querySelector("ins[data-src*='plc="+plc+"']");
	if(insplc == null){
		console.log("couldn't find the ins of plc="+plc);
		return;
	}

	insplc.id = "adv_" + plc;
	//ADVERLINE_PARENT.adnext_flags["f_adv_ifr_" + plc] = 'undefined';
	ADVERLINE.writeIframe(1, 1, "adv_ifr_" + plc, "", insplc);
}

ADVERLINE.writeIframe = ADVERLINE.writeIframe || function(width, height, iframeId, content, newFrame) {
	ADVERLINE[iframeId] = ADVERLINE[iframeId] || {lastSize: {width:0,height:0}};
	
	//ADVERLINE.reloadResize(iframeId);

	var iframeElement, iframeDocument;

	if (newFrame == 1) {

		// newFrame = 1 -> SYNC : write iframe then write content
		document.write('<iframe id="' + iframeId + '" width="' + width + '" height="' + height + '" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" scrolling="no" allowfullscreen="true"></iframe>');
		
	} else if (typeof newFrame == 'object') {

		// newFrame is an object -> ASYNC : use object to append iframe, generate content then write it
		var iframe = document.createElement("iframe");
		
		iframe.setAttribute("id", iframeId);
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("height", 0);
		iframe.setAttribute("leftmargin", 0);
		iframe.setAttribute("marginwidth", "0");
		iframe.setAttribute("marginheight", "0");
		iframe.setAttribute("vspace", "0");
		iframe.setAttribute("hspace", "0");
		iframe.setAttribute("allowtransparency", "true");
		iframe.setAttribute("scrolling", "no");
		iframe.setAttribute("allowfullscreen", "true");
		iframe.setAttribute("topmargin", 0);
		iframe.setAttribute("width", 0);
		iframe.style.border   = "0px";
		iframe.style.margin   = "0px";
		iframe.style.overflow = "hidden";
		iframe.style.padding  = "0px";	
		
		// newFrame is an <ins> tag, it has a set attributes object
		if(newFrame.attributes){
			var content = 'document.write("<script src=\'' + newFrame.attributes["data-src"].value + '&ts=' + Date.now() + '\'></scr"+"ipt>");';
			newFrame.innerHTML = "";
			newFrame.appendChild(iframe);
		}
		else{
			var content = 'document.write("<script src=\'//adnext.fr/richmedia.adv?plc=' + newFrame.plc + '&' + newFrame.qs + '&ts=' +(new Date).getTime()+'\'></scr"+"ipt>");';
			document.getElementById(newFrame.id).appendChild(iframe);
		}
	}
	
	// in every case write content in iframe
	ADVERLINE.iframeFill(iframeId,content);
};

if(( typeof ADVERLINE_PARENT != 'undefined' && typeof ADVERLINE_PARENT.adnext_flags != 'undefined' && typeof ADVERLINE_PARENT.adnext_flags["f_"+adnext_rich['i']] != 'undefined' && ADVERLINE_PARENT.adnext_flags["f_"+adnext_rich['i']] == 1)) {
	
	// iframe already exists, write new content and call resize
	
	if (adnext_rich['i'] == 'adv_ifr_footer') {
		try {
			adnext_rich['c'] = decodeURIComponent(adnext_rich['c']);
		}
		catch(e){}
	}

	document.write("<script type='text/javascript'>" + adnext_rich['c'] + "</scr"+"ipt>");
	
	if (typeof ADVERLINE_PARENT.autoResize == 'function') {
		ADVERLINE_PARENT.autoResize(adnext_rich['i']);
	} else {
		ADVERLINE.autoResize(adnext_rich['i']);
	}

} else if (typeof ADVERLINE.asyncload == 'undefined' && typeof ADVERLINE.asynctags == 'undefined') {
	
	// iframe doesn't exist, SYNC mode, create it
	ADVERLINE.writeIframe(1, 1, adnext_rich['i'], adnext_rich['c'], 1);

} else if (typeof ADVERLINE.adnext != 'undefined' && typeof ADVERLINE.asyncload != 'undefined') {
	
	// iframe doesn't exist, ASYNC mode, create them all with adnext object
	while(asyncFrameInsert = ADVERLINE.adnext.pop()) {
		if (typeof asyncFrameInsert != 'undefined' && parseInt(asyncFrameInsert.plc) > 0  && document.getElementById(asyncFrameInsert.id)) {
			ADVERLINE.writeIframe(1, 1, "adv_ifr_" + asyncFrameInsert.plc, "", asyncFrameInsert);
		}
	}
	delete ADVERLINE.asyncload;
	delete ADVERLINE.adnext;
} else { // if (typeof ADVERLINE.asynctags != 'undefined'){
	
	// iframe doesn't exist, ASYNC mode, create them all using ins tags
	ADVERLINE.insLoad();
	console.log("AdvInsLoad");
}

ADVERLINE.insReload = ADVERLINE.insReload || function() {
	ADVERLINE.adnext_flags = {};
	ADVERLINE.insLoad();
	console.log("AdvInsReLoad");
}