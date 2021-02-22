window.addEventListener('DOMContentLoaded', () => {

	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsParent = document.querySelector('.tabheader__items'),
		tabContent = document.querySelectorAll('.tabcontent');

	function hideTabContent() {
		tabContent.forEach(tab => {
			// tab.style.display = 'none';
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});

	}

	function showTabContent(i = 0) {
		// tabContent[i].style.display = 'block';
		tabContent[i].classList.add('show', 'fade');
		tabContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//Timer
	const deadline = '2021-04-18'; //дата конца работы таймера

	function getTimeRemaining(endtime) { // задача получить разницу между датами
		const t = Date.parse(endtime) - Date.parse(new Date()); //  Date.parse(endtime) количество миллисекунд, которое будет в конечном времени, Date.parse(new Date) текущая дата -> общее количество миллисекунд
		const days = Math.floor(t / (1000 * 60 * 60 * 24)), // получаем количество миллисекунд в минуте, затем в часах, затем в сутках -> сколько осталось дней, floor округлит
			hours = Math.floor((t / (1000 * 60 * 60) % 24)), //общее количество оставших часов, затем делим на 24, чтобы коректно отображалось время
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			"total": t, //общее количество миллисекунд
			"days": days,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds
		}; //возвращаем переменные в объекте наружу
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	} // функция, которая помогает добавлять в числа таймера нули

	function setClock(selector, endtime) { // устанавливаем таймер на страницу
		const timer = document.querySelector(selector), // selector - ".timer"
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000); // запускаем функцию  updateClock каждую секунду

		updateClock(); // вызываем функцию updateClock, чтобы не было мигания при загрузки таймера  

		function updateClock() { // обнавляем таймер каждую секунду
			const t = getTimeRemaining(endtime); // расчет времени, которое осталось на данную минуту и разницу между планируемым временем и текущим

			days.innerHTML = getZero(t.days); // расчетные данные помещаем на страницу через метод innerHTML
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds); //добавляем функцию getZero, чтобы добавить нужным числам нули

			if (t.total <= 0) { // останавливаем таймер
				clearInterval(timeInterval);
			}
		}

	}

	setClock('.timer', deadline);

	//Modal
	const modal = document.querySelector('.modal'),
		modalTrigger = document.querySelectorAll('[data-modal]');


	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	}); // используем forEach, потому что на сам псевдомассив btns мы не можем навесить ОС


	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = ''; // возврат скролла на странице
	}

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden'; // отмена скролла на странице
		clearInterval(modalTimerId); // очищаем таймер, чтобы при уже посмотренном окне оно сново не показывалось
	}

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == "") {
			closeModal();
		}
	}); // закрытие окна при клике на подложку - e.target === modal; закрытие окна на атрибут data-close с пустой строкой

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	}); // закрытие окна при нажатии на esc
	// && modal.classList.contains('show')) - проверка на открытие окна, esc сработает только на закрытие окна, его открывать не будет


	const modalTimerId = setTimeout(openModal, 300000); // показываем окно через 5с

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll); // удаляем ОС, чтобы показать окно только один раз
		}
	}
	// pageYOffset - то сколько пользователь прокрутил
	// clientHeight - видимая часть сайта без прокрутки
	// scrollHeight - вся высота документа с прокруткой

	window.addEventListener('scroll', showModalByScroll); // окно показываем в конце сайта

	// Class for menu cards
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes; //для замены menu__class, получаем массив
			this.parent = document.querySelector(parentSelector);
		} //шаблон

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className)); //перебираем доп св-ва в массиве, вытаскиваем имя каждого класса и его подсоединям к element
			} // подставили самостоятельно "menu__class", если вдруг забыли прописать дефолтный класс в карточке 

			element.innerHTML =
				`<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3> 
				<div class="menu__item-descr">${this.descr}</div> 
			<div class="menu__item-divider"></div> 
			<div class="menu__item-price">
			<div class="menu__item-cost"> Цена: </div> 
			<div class="menu__item-total"><span>${this.price}</span> грн/день </div> 
			</div>`;

			this.parent.append(element);
		}
	} // динамически вставляем верстку на страницу

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
		 throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		//.ok - мы что-то получили и это либо ок, либо нет
		//.status - статус, который вернул нам сервер
		//new Error() - объект ошибки; throw выкидывает ошибку в консоль
		//мы искусственно сделали ошибку, чтобы fetch выдал catch при ошибке от сервера

		return await res.json();
		// возвращаем promise; трансформируем ответ от сервера в объект
	};

	getResource('http://localhost:3000/menu')
	  .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
	// строим карточки с меню, перебирая массив данных и используя деструктизацию объекта

	//Forms
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		});

		return await res.json();
		// возвращаем promise; трансформируем ответ от сервера в JSON
	};
	// data - данные, которые постятся
	//операторы async - внутри функции какой-то асинхронный код; await - ставим перед теми операциями, которые нужно дождаться

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
						display: block;
						margin: 0 auto;
				`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			// formData превращаем в матрицу; затем делаем обычный объект, потом в JSON

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
			//data - данные, которые возвращает promise
		});
	}

	//Вставляем сообщение с благодарностью вместо модалки
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide'); //скрываем старый modal__dialog
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		  <div class="modal__content">
			 <div class="modal__close" data-close>×</div>
			 <div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		//создаем новый modal__dialog

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}
	//возвращаем старый modal__dialog

	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));
});