// Получаем ссылки на элементы HTML, с которыми будем работать
const photoElement = document.getElementById("photo");
const signalElement = document.getElementById("signal");
const answerInput = document.getElementById("answer-input");

// Массив с данными о фотографиях
const charactersData = [
  {
    name: "Грегори",
    surname: "Хаус",
    photoUrl: "IMAGES/18.jpg"
  },
  {
    name: "Йен",
    surname: "Арчер",
    photoUrl: "IMAGES/17.jpg"
  },
  {
    name: "Джек",
    surname: "Бауэр",
    photoUrl: "IMAGES/16.jpg"
  },
  {
    name: "Джон",
    surname: "Макклейн",
    photoUrl: "IMAGES/15.jpg"
  },
  {
    name: "Шерлок",
    surname: "Холмс",
    photoUrl: "IMAGES/14.jpg"
  },
  {
    name: "Мардж",
    surname: "Симпсон",
    photoUrl: "IMAGES/13.jpg"
  },
  {
    name: "Иван",
    surname: "Будько",
    photoUrl: "IMAGES/12.jpg"
  },
  {
    name: "Майкл",
    surname: "Майерс",
    photoUrl: "IMAGES/11.jpg"
  },
  {
    name: "Майкл",
    surname: "Скофилд",
    photoUrl: "IMAGES/10.jpg"
  },
  {
    name: "Дин",
    surname: "Винчестер",
    photoUrl: "IMAGES/9.jpg"
  },
  {
    name: "Перси",
    surname: "Джексон",
    photoUrl: "IMAGES/8.jpg"
  },
  {
    name: "Брюс",
    surname: "Уэйн",
    photoUrl: "IMAGES/7.jpg"
  },
  {
    name: "Джесс",
    surname: "Ааронс",
    photoUrl: "IMAGES/6.jpg"
  },
  {
    name: "Доминик",
    surname: "Торетто",
    photoUrl: "IMAGES/5.jpg"
  },
  {
    name: "Питер",
    surname: "Паркер",
    photoUrl: "IMAGES/4.jpg"
  },
  {
    name: "Гектор",
    surname: "Барбосса",
    photoUrl: "IMAGES/3.jpg"
  },
  {
    name: "Гарри",
    surname: "Поттер",
    photoUrl: "IMAGES/1.jpg"
  },
  {
    name: "Стив",
    surname: "Роджерс",
    photoUrl: "IMAGES/2.jpg"
  },
];

let currentCharacterIndex = 0; // Индекс текущего персонажа в массиве charactersData

// Функция для отображения фотографии и начала игры
function startGame() {
  if (currentCharacterIndex < charactersData.length) {
    const character = charactersData[currentCharacterIndex];
    photoElement.src = character.photoUrl;
    answerInput.value = ""; // Очищаем поле ввода ответа
    signalElement.classList.remove("correct", "incorrect"); // Удаляем классы, отвечающие за цветовой сигнал
    answerInput.disabled = false; // Включаем поле ввода ответа
    answerInput.focus(); // Устанавливаем фокус на поле ввода
  } else {
    // Если персонажи закончились, выводим сообщение об окончании игры
    photoElement.src = ""; // Очищаем фотографию
    photoElement.alt = "Фотография";
    signalElement.textContent = "Игра окончена!";
    signalElement.classList.remove("correct", "incorrect"); // Удаляем классы, отвечающие за цветовой сигнал
    answerInput.disabled = true; // Выключаем поле ввода ответа
  }
}

// Функция для обработки ответа игрока
function checkAnswer() {
  const character = charactersData[currentCharacterIndex];
  const playerAnswer = answerInput.value.trim().toLowerCase(); // Приводим ответ игрока к нижнему регистру

  if (
    playerAnswer ===
    `${character.name.toLowerCase()} ${character.surname.toLowerCase()}`
  ) {
    signalElement.textContent = "Правильно!";
    signalElement.classList.add("correct");
    currentCharacterIndex++;
    setTimeout(startGame, 2000); // Показываем правильный ответ в течение 2 секунд перед переходом к следующей фотографии
  } else {
    signalElement.textContent = "Неправильно! Игра окончена.";
    signalElement.classList.add("incorrect");
    answerInput.disabled = true; // Выключаем поле ввода ответа
  }
}

// Обработчик события для кнопки "Начать игру"
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

// Обработчик события для поля ввода ответа (нажатие клавиши Enter)
answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// Запускаем первую игру
startGame();