function openTab(tabName) {
  const tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = 'block';
}


// Получаем ссылки на элементы HTML, с которыми будем работать
const photoElement = document.getElementById("photo");
const signalElement = document.getElementById("signal");
const answerInput = document.getElementById("answer-input");
const startRecognitionButton = document.getElementById("start-recognition"); // Получаем ссылку на кнопку распознавания речи

// Массив с данными о фотографиях
const charactersData = [
  {
    name: "Василий",
    surname: "Рогов",
    photoUrl: "IMAGES/19.jpg"
  },
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

// Функция для перемешивания массива в случайном порядке
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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

// Запускаем первую игру
shuffleArray(charactersData); // Перемешиваем массив с данными о фотографиях
let currentCharacterIndex = 0; // Индекс текущего персонажа в массиве charactersData
startGame();

// Обработчик события для кнопки "Начать игру"
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  shuffleArray(charactersData); // Перемешиваем массив с данными о фотографиях перед каждой новой игрой
  currentCharacterIndex = 0; // Сбрасываем индекс текущего персонажа
  startGame(); // Запускаем новую игру после перемешивания массива
});

// Функция для начала распознавания речи
function startSpeechRecognition() {
  // Создаем объект для распознавания речи
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'ru-RU'; // Устанавливаем язык распознавания (может быть изменен на другой, если требуется)

  recognition.onresult = (event) => {
    // Получаем распознанный текст
    const speechResult = event.results[0][0].transcript;
    // Помещаем распознанный текст в поле ввода
    answerInput.value = speechResult;
    // После распознавания запускаем функцию для проверки ответа
    checkAnswer();
  };

  // Обработчик ошибок распознавания
  recognition.onerror = (event) => {
    console.error('Ошибка распознавания речи:', event.error);
  };

  // Запускаем распознавание речи по нажатию кнопки "Начать распознавание речи"
  startRecognitionButton.addEventListener("click", () => {
    recognition.start();
  });
}

// Функция для обработки ответа игрока
function checkAnswer() {
  const character = charactersData[currentCharacterIndex];
  const playerAnswer = answerInput.value.trim().toLowerCase(); // Приводим ответ игрока к нижнему регистру

  // Удаление всех знаков препинания из ответа игрока
  const cleanedPlayerAnswer = playerAnswer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();

  // Удаление лишних пробелов
  const formattedCharacterName = `${character.name.toLowerCase()} ${character.surname.toLowerCase()}`;
  const cleanedCharacterName = formattedCharacterName.replace(/\s+/g, ' ').trim();

  const audioCorrect = document.getElementById("audio-correct");
  const audioIncorrect = document.getElementById("audio-incorrect");

  if (cleanedPlayerAnswer === cleanedCharacterName) {
    signalElement.textContent = "Правильно!";
    signalElement.classList.add("correct");
    currentCharacterIndex++;
    setTimeout(startGame, 2000); // Показываем правильный ответ в течение 2 секунд перед переходом к следующей фотографии
    audioCorrect.play(); // Воспроизводим звук правильного ответа
  } else {
    signalElement.textContent = "Ты проиграл!";
    signalElement.classList.add("incorrect");
    answerInput.disabled = true; // Выключаем поле ввода ответа
    audioIncorrect.play(); // Воспроизводим звук неправильного ответа
  }
}

// Обработчик события для поля ввода ответа (нажатие клавиши Enter)
answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// Запускаем первую игру
startGame();
// Запускаем распознавание речи
startSpeechRecognition();