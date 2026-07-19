(function () {
	'use strict';

	var header = document.querySelector('[data-site-header]');
	var menuToggle = document.querySelector('[data-menu-toggle]');
	var navigation = document.getElementById('site-navigation');
	var submenuToggles = document.querySelectorAll('[data-submenu-toggle]');
	var customSelects = document.querySelectorAll('[data-custom-select]');
	var contactForms = document.querySelectorAll('.qct-contact-form');
	var revealItems = document.querySelectorAll('[data-qct-reveal]');
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var desktopNavigation = window.matchMedia('(min-width: 1040px)');
	var submenuCloseDelay = 225;
	var submenuTimers = new WeakMap();

	var closeSubmenu = function (toggle) {
		var item = toggle.closest('.menu-item-has-children');
		var panel = item ? item.querySelector('.sub-menu') : null;

		toggle.setAttribute('aria-expanded', 'false');

		if (item) {
			item.classList.remove('is-submenu-open');
		}

		if (panel) {
			panel.style.maxHeight = '0';
			panel.style.opacity = '0';
			panel.style.pointerEvents = 'none';
			panel.style.transform = desktopNavigation.matches ? 'translateY(8px)' : 'translateY(-4px)';
			panel.style.visibility = 'hidden';
		}
	};

	var suppressSubmenu = function (toggle) {
		var item = toggle.closest('.menu-item-has-children');

		closeSubmenu(toggle);

		if (item) {
			item.classList.add('is-submenu-suppressed');
		}
	};

	var openSubmenu = function (toggle) {
		var item = toggle.closest('.menu-item-has-children');
		var panel = item ? item.querySelector('.sub-menu') : null;
		var timer = submenuTimers.get(toggle);

		if (timer) {
			window.clearTimeout(timer);
		}

		submenuToggles.forEach(function (otherToggle) {
			if (otherToggle !== toggle) {
				closeSubmenu(otherToggle);
			}
		});

		toggle.setAttribute('aria-expanded', 'true');

		if (item) {
			item.classList.remove('is-submenu-suppressed');
			item.classList.add('is-submenu-open');
		}

		if (panel) {
			panel.style.maxHeight = '520px';
			panel.style.opacity = '1';
			panel.style.pointerEvents = 'auto';
			panel.style.transform = 'translateY(0)';
			panel.style.visibility = 'visible';
		}
	};

	var scheduleSubmenuClose = function (toggle) {
		var timer = submenuTimers.get(toggle);

		if (timer) {
			window.clearTimeout(timer);
		}

		submenuTimers.set(toggle, window.setTimeout(function () {
			closeSubmenu(toggle);
		}, submenuCloseDelay));
	};

	if (menuToggle && navigation) {
		var closeMenu = function () {
			menuToggle.setAttribute('aria-expanded', 'false');
			navigation.classList.remove('is-open');
			document.body.classList.remove('has-open-menu');
			submenuToggles.forEach(function (toggle) {
				closeSubmenu(toggle);
			});
		};

		var openMenu = function () {
			menuToggle.setAttribute('aria-expanded', 'true');
			navigation.classList.add('is-open');
			document.body.classList.add('has-open-menu');
		};

		menuToggle.addEventListener('click', function () {
			if (menuToggle.getAttribute('aria-expanded') === 'true') {
				closeMenu();
			} else {
				openMenu();
			}
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape') {
				closeMenu();
				menuToggle.focus();
			}
		});

		navigation.addEventListener('click', function (event) {
			if (event.target.closest('a') && !desktopNavigation.matches) {
				closeMenu();
			}
		});
	}

	submenuToggles.forEach(function (toggle) {
		var item = toggle.closest('.menu-item-has-children');

		toggle.addEventListener('click', function () {
			var isOpen = toggle.getAttribute('aria-expanded') === 'true';

			if (isOpen) {
				closeSubmenu(toggle);
			} else {
				openSubmenu(toggle);
			}
		});

		toggle.addEventListener('keydown', function (event) {
			if (event.key === 'Escape') {
				suppressSubmenu(toggle);
				toggle.focus();
			}
		});

		if (item) {
			item.addEventListener('pointerenter', function () {
				if (desktopNavigation.matches) {
					openSubmenu(toggle);
				}
			});

			item.addEventListener('pointerleave', function () {
				item.classList.remove('is-submenu-suppressed');

				if (desktopNavigation.matches) {
					scheduleSubmenuClose(toggle);
				}
			});

			item.addEventListener('focusout', function (event) {
				if (desktopNavigation.matches && !item.contains(event.relatedTarget)) {
					scheduleSubmenuClose(toggle);
				}
			});
		}
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			submenuToggles.forEach(function (toggle) {
				suppressSubmenu(toggle);
			});
		}
	});

	var closeCustomSelect = function (select) {
		var button = select.querySelector('[data-custom-select-button]');

		select.classList.remove('is-open');

		if (button) {
			button.setAttribute('aria-expanded', 'false');
		}
	};

	var openCustomSelect = function (select) {
		var button = select.querySelector('[data-custom-select-button]');

		customSelects.forEach(function (otherSelect) {
			if (otherSelect !== select) {
				closeCustomSelect(otherSelect);
			}
		});

		select.classList.add('is-open');

		if (button) {
			button.setAttribute('aria-expanded', 'true');
		}
	};

	var selectCustomOption = function (select, option) {
		var input = select.querySelector('[data-custom-select-input]');
		var label = select.querySelector('[data-custom-select-label]');
		var options = select.querySelectorAll('[role="option"]');

		options.forEach(function (item) {
			item.setAttribute('aria-selected', item === option ? 'true' : 'false');
		});

		if (input) {
			input.value = option.getAttribute('data-value') || option.textContent.trim();
			input.dispatchEvent(new Event('change', { bubbles: true }));
		}

		if (label) {
			label.textContent = option.textContent.trim();
		}

		closeCustomSelect(select);
	};

	customSelects.forEach(function (select) {
		var button = select.querySelector('[data-custom-select-button]');
		var panel = select.querySelector('[data-custom-select-panel]');
		var options = Array.prototype.slice.call(select.querySelectorAll('[role="option"]'));

		if (!button || !panel || !options.length) {
			return;
		}

		button.addEventListener('click', function () {
			if (select.classList.contains('is-open')) {
				closeCustomSelect(select);
			} else {
				openCustomSelect(select);
				options[0].focus();
			}
		});

		button.addEventListener('keydown', function (event) {
			if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				openCustomSelect(select);
				options[0].focus();
			}
		});

		options.forEach(function (option, index) {
			option.setAttribute('aria-selected', 'false');

			option.addEventListener('click', function () {
				selectCustomOption(select, option);
				button.focus();
			});

			option.addEventListener('keydown', function (event) {
				var nextIndex = index;

				if (event.key === 'ArrowDown') {
					event.preventDefault();
					nextIndex = Math.min(index + 1, options.length - 1);
					options[nextIndex].focus();
				}

				if (event.key === 'ArrowUp') {
					event.preventDefault();
					nextIndex = Math.max(index - 1, 0);
					options[nextIndex].focus();
				}

				if (event.key === 'Home') {
					event.preventDefault();
					options[0].focus();
				}

				if (event.key === 'End') {
					event.preventDefault();
					options[options.length - 1].focus();
				}

				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					selectCustomOption(select, option);
					button.focus();
				}

				if (event.key === 'Escape') {
					event.preventDefault();
					closeCustomSelect(select);
					button.focus();
				}
			});
		});
	});

	document.addEventListener('click', function (event) {
		customSelects.forEach(function (select) {
			if (!select.contains(event.target)) {
				closeCustomSelect(select);
			}
		});
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			customSelects.forEach(function (select) {
				closeCustomSelect(select);
			});
		}
	});

	contactForms.forEach(function (form) {
		form.addEventListener('submit', function () {
			form.classList.add('is-submitted');
		});
	});

	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (event) {
			var targetId = anchor.getAttribute('href');

			if (!targetId || targetId === '#') {
				return;
			}

			var target = document.querySelector(targetId);

			if (!target) {
				return;
			}

			event.preventDefault();
			target.scrollIntoView({
				behavior: reduceMotion ? 'auto' : 'smooth',
				block: 'start'
			});
			history.pushState(null, '', targetId);
		});
	});

	if (header) {
		var setHeaderState = function () {
			header.classList.toggle('is-scrolled', window.scrollY > 8);
		};

		setHeaderState();
		window.addEventListener('scroll', setHeaderState, { passive: true });
	}

	if (revealItems.length) {
		if (reduceMotion || !('IntersectionObserver' in window)) {
			revealItems.forEach(function (item) {
				item.classList.add('is-visible');
			});
		} else {
			var revealObserver = new IntersectionObserver(function (entries, observer) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			}, {
				rootMargin: '0px 0px -12% 0px',
				threshold: 0.16
			});

			revealItems.forEach(function (item) {
				revealObserver.observe(item);
			});
		}
	}
})();
