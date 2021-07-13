let filterInstance = null;
let filterButton = null;
let filterOptions = null;

if (!Element.prototype.matches)
{
  var ep = Element.prototype;

  if (ep.webkitMatchesSelector) // Chrome <34, SF<7.1, iOS<8
    ep.matches = ep.webkitMatchesSelector;

  if (ep.msMatchesSelector) // IE9/10/11 & Edge
    ep.matches = ep.msMatchesSelector;

  if (ep.mozMatchesSelector) // FF<34
    ep.matches = ep.mozMatchesSelector;
}

window.addEventListener('resize', function (event) {

	document.body.classList.add("resize-animation-stopper");
	document.body.classList.remove("nav-visible");

}, true);

window.addEventListener('load', function () {
  // IE 11 version and below
  if ((navigator.userAgent.toUpperCase().indexOf("TRIDENT") != -1) || (navigator.userAgent.toUpperCase().indexOf("MSIE") != -1)) {
    var elements = document.querySelectorAll('input[type=date]');
    for (i = 0; i < elements.length; i++) {
      elements[i].value = elements[i].getAttribute('data-date-formatted');
    }
  }
}, false);

document.addEventListener('click', function (event) {

	document.body.classList.remove("resize-animation-stopper");

	if (event.target.matches('.nav-show')) {
    document.body.classList.toggle("nav-visible");
	}

	if (event.target.matches('.nav-hide')) {
    document.body.classList.remove("nav-visible");
	}

  if (event.target.matches('.custom-table-transactions .collapse-toggle')) {
    target = document.getElementById(event.target.getAttribute('data-target'));
    target.classList.toggle('collapsed');
    if (target.matches('#thead-year-all')) {
      var visible = document.getElementsByTagName('tbody');
      for (i = 0; i < visible.length; i++) {
        if (target.classList.contains('collapsed')) {
          visible[i].classList.add('collapsed');
        } else {
          visible[i].classList.remove('collapsed');
        }
      }
    }
	}

  // Tab switching
  if (event.target.matches('.tabs > *') && event.target.getAttribute('data-target')) {
    tabs = event.target.parentElement.children;
    for (i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }
    event.target.classList.add('active');
    target = document.getElementById(event.target.getAttribute('data-target'));
    targetGroup = target.parentElement.children;
    for (i = 0; i < targetGroup.length; i++) {
      targetGroup[i].classList.remove('active');
    }
    target.classList.add('active');
	}

	var visible = document.getElementsByClassName('visible');
	for (i = 0; i < visible.length; i++) {
		if (!visible[i].contains(event.target)) {
			visible[i].classList.remove('visible');
		}
	}

	if (event.target.matches('.profile') || event.target.matches('.construction-indicator') || event.target.matches('.activity-selector')) {
		var filterPosition = event.target.parentElement.getBoundingClientRect();
		event.target.firstElementChild.style.top = filterPosition.bottom + "px";
		event.target.firstElementChild.style.left = filterPosition.left + "px";
		//event.target.parentElement.style.top = filterPosition.bottom + "px";
		//event.target.parentElement.style.left = filterPosition.right + "px";
		event.target.classList.toggle("visible");
		event.target.blur();
	}

	// var filter = document.getElementsByClassName('filter');
	// for (i = 0; i < filter.length; i++) {
	// 	if (!filter[i].contains(event.target)) {
	// 		filter[i].removeAttribute('data-show');
	// 	}
	// }
	if (filterInstance) {

		if (!filterOptions.contains(event.target)) {
			var filter = document.getElementsByClassName('filter');
			for (i = 0; i < filter.length; i++) {
					filter[i].removeAttribute('data-show');
			}
			filterInstance.destroy();
			filterInstance = null;
		}
		if (event.target.matches('.filter-toggle') && (event.target.id != filterButton.id)) {
			filterButton = document.getElementById(event.target.getAttribute('id'));
			filterOptions = document.getElementById(event.target.getAttribute('data-target'));
			filterInstance = Popper.createPopper(filterButton, filterOptions, {
				placement: 'bottom-start',
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, 8],
						},
					},
				],
			});
			filterOptions.setAttribute('data-show', '');
		}
	}
	else if (event.target.matches('.filter-toggle')) {
		filterButton = document.getElementById(event.target.getAttribute('id'));
		filterOptions = document.getElementById(event.target.getAttribute('data-target'));
		filterInstance = Popper.createPopper(filterButton, filterOptions, {
			placement: 'bottom-start',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 8],
					},
				},
			],
		});
		filterOptions.setAttribute('data-show', '');
	}

}, false);

document.addEventListener('keydown', function (event) {

	if (event.which === 27) {
		var visible = document.getElementsByClassName('visible');
		for (i = 0; i < visible.length; i++) {
			visible[i].classList.remove('visible');
		}
		var filter = document.getElementsByClassName('filter');
		for (i = 0; i < filter.length; i++) {
				filter[i].removeAttribute('data-show');
		}
		if (filterInstance) {
			filterInstance.destroy();
			filterInstance = null;
		}
	}

}, false);

// const tooltipTitle = document.querySelector('#tooltip-effective-date-content');
// const tooltipTrigger = document.querySelector('#tooltip-effective-date');
// Popper.createPopper(tooltipTitle, tooltipTrigger, {
//   placement: 'top',
// });
