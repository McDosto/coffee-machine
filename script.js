"use strict"      /*строгий режим*/

let balance = document.querySelector(".balance") /*создаем переменную баланс иобращаемся к классу*/  
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");
let coffeeStatus = "waiting"; // "cooking" "ready"

function buyCoffee(name, cost, elem) {
  if (coffeeStatus != "waiting") {
     return;
  }
  let afterBuyValue = +balance.value - cost; 
  if ( (+balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) { /*палки или*/
    balance.style.border = "2px solid red"/*делает рамку красной при недостатке*/
    balance.style.backgroundColor = "pink";      /*в сисс- в джаве вербл.*/
   changeDisplayText("Недостаточно средств!")   /*вызываем функию смена текста*/
   return;
  }
  balance.style.border = "none"        
  balance.style.backgroundColor = "white";
  balance.value = (+balance.value - cost).toFixed(2);  /*туфиксед количество цифр после точки*/
  cookCoffee(name, elem)
}

function cookCoffee(name, elem) {
  coffeeStatus = "cooking";
  changeDisplayText("Ваш " + name + " готовится");
  
  let cupImg = elem.querySelector("img");
  let cupSrc = cupImg.getAttribute("src");
  coffeeCup.setAttribute("src", cupSrc);
  coffeeCup.style.opacity = "0";
  coffeeCup.classList.remove("d-none");      // убрать класс
  //coffeeCup.classList.add("")   добавить
  //coffeeCup.classList.toggle("")      вкл выкл
  //coffeeCup.classList.contains("d-none")  содержит ли?
  
  let readyPercent = 0;
  let cookingInterval = setInterval(() => {
    readyPercent++
    progressBar.style.width = readyPercent + "%";
    coffeeCup.style.opacity = readyPercent + "%";
    if (readyPercent == 100) {
      coffeeStatus = "ready";
      changeDisplayText ("Ваш " + name + " готов");
      coffeeCup.style.cursor = "pointer";
      clearInterval(cookingInterval);
    }
  }, 100);
}

function changeDisplayText(text) {    /*создаем функцию смена текста*/
  /*displayText.innerText = "<span>"+text+"</span>";;*/  /*нельзя вставлять html код*/
  displayText.innerHTML = "<span>"+text+"</span>"; /*можно*/
}
