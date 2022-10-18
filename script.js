const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-answers");
const verbsContainer = document.getElementById("verbs-container");

const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");

const numberOfVerbs = verbs.length;

let possibleAnswers = [0, 1, 1, 1];
let positionsOfVerbs = [];
let rightAnswersCounter = 0;
let rightAnswer;

next.addEventListener("click", function () {
  ponerVerbo();
  next.style.display = "none";
  // console.log('hola');
});

makeRandomList();
let lastPosition = positionsOfVerbs.length - 1;

function makeRandomList() {
  for (var i = 0; i < numberOfVerbs; i++) {
    positionsOfVerbs.push(i);
  }
  positionsOfVerbs = positionsOfVerbs.sort(() => Math.random() - 0.5);
}

function buttonEffect(itsRight, button) {
  if (itsRight) {
    button.classList.add("rightAnswer");
    setTimeout(function () {
      button.classList.remove("rightAnswer");
    }, 300);
    rightAnswersCounter = rightAnswersCounter + 1;
  } else {
    button.classList.add("wrongAnswer");
    setTimeout(function () {
      button.classList.remove("wrongAnswer");
    }, 300);
  }
  setTimeout(function () {
    ponerVerbo();
  }, 300);
}

first.addEventListener("click", function () {
  buttonEffect(isItRight_(first.innerHTML), this);
});
second.addEventListener("click", function () {
  buttonEffect(isItRight_(second.innerHTML), this);
});
third.addEventListener("click", function () {
  buttonEffect(isItRight_(third.innerHTML), this);
});
fourth.addEventListener("click", function () {
  buttonEffect(isItRight_(fourth.innerHTML), this);
});

function randomOptions(array) {
  let numberOfAnswerButtons = array.length;
  let randomIndex;
  while (numberOfAnswerButtons != 0) {
    randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
    numberOfAnswerButtons--;
    [array[numberOfAnswerButtons], array[randomIndex]] = [
      array[randomIndex],
      array[numberOfAnswerButtons],
    ];
  }
  return array;
}

function isItRight_(answer) {
  return answer == rightAnswer ? true : false;
}

function randomVerbo(notThisOne) {
  theOne = Math.floor(Math.random() * verbos.length);

  return theOne == notThisOne ? randomVerbo(notThisOne) : theOne;
}

function ponerVerbo() {
  possibleAnswers = randomOptions(possibleAnswers);
  let randomPosition = positionsOfVerbs[lastPosition];
  let imgText =
    "<img src='./Imagenes/" +
    verbs[randomPosition] +
    ".jpg' height:'140px' width='100px'>";
  first.classList.add("btn", "btn-outline-primary", "btn-md");
  second.classList.add("btn", "btn-outline-primary", "btn-md");
  third.classList.add("btn", "btn-outline-primary", "btn-md");
  fourth.classList.add("btn", "btn-outline-primary", "btn-md");

  if (lastPosition >= 0){
    var just_position = lastPosition+1;
    verbsCounter.innerHTML = ""+just_position+" / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    showVerb.innerHTML = verbs[randomPosition];
    showImage.innerHTML = imgText;

    showAudio.src = "Audios/" + verbs[randomPosition] + ".mp3";
    showAudio.play();

    first.innerHTML = !possibleAnswers[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    second.innerHTML = !possibleAnswers[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    third.innerHTML = !possibleAnswers[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    fourth.innerHTML = !possibleAnswers[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    rightAnswer = verbos[randomPosition]
    lastPosition = lastPosition -1;
  }else{
    verbsCounter.innerHTML = "0 / "+numberOfVerbs;
      allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
      showVerb.innerHTML = "Bien hecho terminaste";
      verbsContainer.innerHTML = "";
  }
}

buttonPlay.addEventListener('click', () => {
  showAudio.play()
})