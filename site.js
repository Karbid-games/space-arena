// Язык страницы (RU / EN: по браузеру, выбор запоминается) и копирование адреса почты.
(function () {
	var root = document.documentElement;
	function set(lang) {
		root.lang = lang;
		var ru = document.getElementById("lang-ru"), en = document.getElementById("lang-en");
		if (ru) ru.setAttribute("aria-pressed", String(lang === "ru"));
		if (en) en.setAttribute("aria-pressed", String(lang === "en"));
		try { localStorage.setItem("lang", lang); } catch (e) {}
	}
	var saved = null;
	try { saved = localStorage.getItem("lang"); } catch (e) {}
	set(saved || ((navigator.language || "ru").toLowerCase().indexOf("ru") === 0 ? "ru" : "en"));
	document.querySelectorAll(".lang button").forEach(function (b) {
		b.addEventListener("click", function () { set(b.dataset.set); });
	});
	var copy = document.getElementById("copy-mail");
	if (copy) copy.addEventListener("click", function () {
		var done = function () {
			copy.dataset.label = copy.dataset.label || copy.innerHTML;
			copy.textContent = root.lang === "en" ? "Copied" : "Скопировано";
			setTimeout(function () { copy.innerHTML = copy.dataset.label; }, 1600);
		};
		var mail = "papasharau@gmail.com";
		if (navigator.clipboard) navigator.clipboard.writeText(mail).then(done, function () {});
	});
})();
