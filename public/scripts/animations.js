(function () {
	'use strict';

	var hero = document.querySelector('[data-qct-hero]');
	var room = hero ? hero.querySelector('[data-signal-room]') : null;

	if (!hero || !room) {
		return;
	}

	var controls = Array.prototype.slice.call(room.querySelectorAll('[data-signal-control]'));
	var panels = Array.prototype.slice.call(room.querySelectorAll('[data-signal-panel]'));
	var label = room.querySelector('[data-signal-label]');
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var activeIndex = 0;
	var intervalId = null;
	var heroVisible = true;
	var interactionPaused = false;

	if (!controls.length || controls.length !== panels.length) {
		return;
	}

	var activateState = function (index, focusControl) {
		activeIndex = (index + controls.length) % controls.length;

		controls.forEach(function (control, controlIndex) {
			var isActive = controlIndex === activeIndex;
			control.setAttribute('aria-pressed', isActive ? 'true' : 'false');

			if (isActive && label) {
				label.textContent = control.textContent.trim();
			}

			if (isActive && focusControl) {
				control.focus();
			}
		});

		panels.forEach(function (panel, panelIndex) {
			var isActive = panelIndex === activeIndex;
			panel.hidden = !isActive;
			panel.classList.remove('is-active', 'is-entering');

			if (isActive) {
				panel.classList.add('is-active');
				panel.offsetWidth;
				panel.classList.add('is-entering');
				room.setAttribute('data-signal-state', panel.getAttribute('data-signal-panel'));
			}
		});
	};

	var stopRotation = function () {
		if (intervalId) {
			window.clearInterval(intervalId);
			intervalId = null;
		}
	};

	var startRotation = function () {
		stopRotation();

		if (reduceMotion || !heroVisible || interactionPaused || document.hidden) {
			return;
		}

		intervalId = window.setInterval(function () {
			activateState(activeIndex + 1, false);
		}, 4800);
	};

	controls.forEach(function (control, index) {
		control.addEventListener('click', function () {
			activateState(index, false);
			startRotation();
		});

		control.addEventListener('keydown', function (event) {
			var nextIndex = null;

			if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
				nextIndex = index + 1;
			} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
				nextIndex = index - 1;
			} else if (event.key === 'Home') {
				nextIndex = 0;
			} else if (event.key === 'End') {
				nextIndex = controls.length - 1;
			}

			if (nextIndex !== null) {
				event.preventDefault();
				activateState(nextIndex, true);
			}
		});
	});

	room.addEventListener('mouseenter', function () {
		interactionPaused = true;
		stopRotation();
	});

	room.addEventListener('mouseleave', function () {
		interactionPaused = false;
		startRotation();
	});

	room.addEventListener('focusin', function () {
		interactionPaused = true;
		stopRotation();
	});

	room.addEventListener('focusout', function (event) {
		if (!room.contains(event.relatedTarget)) {
			interactionPaused = false;
			startRotation();
		}
	});

	if ('IntersectionObserver' in window) {
		new IntersectionObserver(function (entries) {
			heroVisible = entries[0].isIntersecting;
			startRotation();
		}, { threshold: 0.2 }).observe(hero);
	}

	document.addEventListener('visibilitychange', startRotation);
	activateState(0, false);
	startRotation();

	var showcase = document.querySelector('[data-work-showcase]');
	if (showcase) {
		var workPanels = Array.prototype.slice.call(showcase.querySelectorAll('[data-work-panel]'));
		var workControls = Array.prototype.slice.call(showcase.querySelectorAll('[data-work-control]'));
		var workPrevious = showcase.querySelector('[data-work-previous]');
		var workNext = showcase.querySelector('[data-work-next]');
		var workIndex = 0;
		var workTimer = null;
		var workVisible = true;
		var workPaused = false;

		showcase.classList.add('is-enhanced');
		var activateWork = function (index) {
			workIndex = (index + workPanels.length) % workPanels.length;
			workPanels.forEach(function (panel, panelIndex) {
				var active = panelIndex === workIndex;
				panel.hidden = !active;
				panel.classList.toggle('is-active', active);
			});
			workControls.forEach(function (control, controlIndex) {
				control.setAttribute('aria-pressed', controlIndex === workIndex ? 'true' : 'false');
			});
			workPrevious.setAttribute('aria-label', workControls[(workIndex - 1 + workControls.length) % workControls.length].getAttribute('aria-label'));
			workNext.setAttribute('aria-label', workControls[(workIndex + 1) % workControls.length].getAttribute('aria-label'));
		};

		var stopWork = function () {
			if (workTimer) {
				window.clearInterval(workTimer);
				workTimer = null;
			}
		};
		var startWork = function () {
			stopWork();
			if (!reduceMotion && workVisible && !workPaused && !document.hidden) {
				workTimer = window.setInterval(function () { activateWork(workIndex + 1); }, 6200);
			}
		};

		workControls.forEach(function (control, index) {
			control.addEventListener('click', function () { activateWork(index); startWork(); });
		});
		workPrevious.addEventListener('click', function () { activateWork(workIndex - 1); startWork(); });
		workNext.addEventListener('click', function () { activateWork(workIndex + 1); startWork(); });
		showcase.addEventListener('mouseenter', function () { workPaused = true; stopWork(); });
		showcase.addEventListener('mouseleave', function () { workPaused = false; startWork(); });
		showcase.addEventListener('focusin', function () { workPaused = true; stopWork(); });
		showcase.addEventListener('focusout', function (event) {
			if (!showcase.contains(event.relatedTarget)) { workPaused = false; startWork(); }
		});
		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				workVisible = entries[0].isIntersecting;
				startWork();
			}, { threshold: 0.18 }).observe(showcase);
		}
		activateWork(0);
		startWork();
	}

	var processTimeline = document.querySelector('[data-process-timeline]');
	if (processTimeline) {
		var processSteps = Array.prototype.slice.call(processTimeline.querySelectorAll('[data-process-step]'));
		processTimeline.classList.add('is-enhanced');
		var activateProcess = function (activeStep) {
			var activeProcessIndex = processSteps.indexOf(activeStep);
			processSteps.forEach(function (step, index) {
				step.classList.toggle('is-current', index === activeProcessIndex);
				step.classList.toggle('is-resolved', index < activeProcessIndex);
			});
			processTimeline.style.setProperty('--process-progress-number', processSteps.length > 1 ? activeProcessIndex / (processSteps.length - 1) : 1);
		};

		if (!reduceMotion && 'IntersectionObserver' in window) {
			activateProcess(processSteps[0]);
			var processObserver = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) { activateProcess(entry.target); }
				});
			}, { rootMargin: '-28% 0px -38% 0px', threshold: 0.2 });
			processSteps.forEach(function (step) { processObserver.observe(step); });
		} else {
			processSteps.forEach(function (step) { step.classList.add('is-resolved'); });
			processTimeline.style.setProperty('--process-progress-number', 1);
		}
	}
})();
