function onPageSizeChange(pageNumber, form){	
	form.page.value = 0;
	form.submit();
}
function onPageChange(pageNumber, form){
	form.page.value = pageNumber;
	form.submit();
}

function onClickSorting(sortParam, formName){
	var form = document.getElementById(formName);
	form.sort.value = sortParam;
	form.submit();
	
}

function onButtonClickSorting(sortOption,formName){
	var ele = document.getElementsByName(sortOption)
	var sortParam = null;
	for(var i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
        	sortParam = ele[i].value;
        	break;
        }      
    } 
	if(sortParam == null) return;
	var form = document.getElementById(formName);
	form.sort.value = sortParam;
	form.submit();
}

function redirectWithPost(url, attrs, keys)
{
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    
    for(var i=0; i<keys.length; i++){
    	var input = document.createElement('input');
        input.type = 'hidden';
        input.name = keys[i];
        input.value = attrs[i];
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
   
}

// Polyfill code For browsers that do not support Element.closest(), but carry
// support for element.matches()
if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;

		do {
			if (Element.prototype.matches.call(el, s))
				return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}
// polyfill ended

function checkCollapseOrExpand(currentUser){
	let currentStatus = sessionStorage.getItem(currentUser);
	if(currentStatus == null){
		currentStatus = {};
		sessionStorage.setItem(currentUser,JSON.stringify(currentStatus));
	}else{
        currentStatus = JSON.parse(currentStatus);
		for(let buttonId in currentStatus){
			let status = currentStatus[buttonId];
			if(status == true && buttonId != 'button-all-year'){
				performExpandOperation(buttonId,'tbody');
			}else if(buttonId == 'button-all-year' && status == true){
                performExpandOperation(buttonId,'thead');
			}
		}
	}
}

function performExpandOperation(buttonId,tbPart){
	if (typeof buttonId === 'string' || buttonId instanceof String){
	let tbody = document.getElementById(buttonId).closest(tbPart);
	if(tbody.classList.contains('collapsed')){
		tbody.classList.remove('collapsed');
	}
    }
}

function setCollapseOrExpand(currentUser, buttonId, isForAllYear){
	let currentStatus = sessionStorage.getItem(currentUser);
    if(currentStatus!=null){
    	currentStatus = JSON.parse(currentStatus);
			if(currentStatus.hasOwnProperty(buttonId)){
				currentStatus[buttonId] = !currentStatus[buttonId];
			}else{
				currentStatus[buttonId] = true;
			}
		if(isForAllYear){
			currentStatus = setAllCollapseOrExpand(currentStatus, buttonId);
		}
       sessionStorage.setItem(currentUser,JSON.stringify(currentStatus));
	}
}

function setAllCollapseOrExpand(currentStatus, buttonId){
	let buttons = document.querySelectorAll('[id^="button-year-"]');
	for(let i = 0; i<buttons.length; i++){
		currentStatus[buttons[i].id] = currentStatus[buttonId];
	}
	return currentStatus;
}

function setOpenFromLink(openFromLinkKey){
	sessionStorage.setItem(openFromLinkKey,"true");
}

function checkOpenFromLink(openFromLinkKey,elementId){
	if(sessionStorage.getItem(openFromLinkKey) == "true"){
		let element = document.getElementById(elementId);
		if(element!=null){
            element.parentNode.removeChild(element);
		}
	}
}




