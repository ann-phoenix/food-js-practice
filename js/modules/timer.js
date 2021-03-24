function timer() {
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
}

module.exports = timer;