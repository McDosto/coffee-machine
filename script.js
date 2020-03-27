"use strict"      /*строгий режим*/

let balance = document.querySelector(".balance") /*создаем переменную баланс иобращаемся к классу*/  
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");
let coffeeStatus = "waiting"; // "cooking" "ready"

coffeeCup.onclick = takeCoffee; //вызываем функцию убрать кружку  первый вариант*
 



function buyCoffee(name, cost, elem) {
  if (coffeeStatus != "waiting") {   //если статус не равен waiting-    
     return;                            // - то ничего не делай
  }
  let afterBuyValue = +balance.value - cost; 
  if ( (+balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) { /*палки или*/
    balance.style.border = "2px solid red"/*делает рамку красной при недостатке*/
    balance.style.backgroundColor = "pink";      /*в сисс- в джаве вербл.*/
   changeDisplayText("Недостаточно средств!")   /*вызываем функию смена текста*/
   return;
  }
  balance.style.border = "none"  //убирает рамку, если денег хватает      
  balance.style.backgroundColor = "white"; //делает белый фон строки, если денег хватает 
  balance.value = (+balance.value - cost).toFixed(2);  /*туфиксед количество цифр после точки*/
  cookCoffee(name, elem)
}

function cookCoffee(name, elem) {
  coffeeStatus = "cooking";       //выводит надпись на дисплее готовится
  changeDisplayText("Ваш " + name + " готовится"); // -||-
  
  let cupImg = elem.querySelector("img");
  let cupSrc = cupImg.getAttribute("src");
  coffeeCup.setAttribute("src", cupSrc);
  coffeeCup.style.opacity = "0";
  coffeeCup.classList.remove("d-none");      // убрать класс
  
  let readyPercent = 0;
  let cookingInterval = setInterval(() => {
    readyPercent++
    progressBar.style.width = readyPercent + "%";
    coffeeCup.style.opacity = readyPercent + "%";
    if (readyPercent == 100) {              //если шкала 100%-
      coffeeStatus = "ready";               //- то делай статус готов
      changeDisplayText ("Ваш " + name + " готов");  //текст на дисплее по готовности
      coffeeCup.style.cursor = "pointer";  //по готовности кофе меняет курсор на палец
      clearInterval(cookingInterval);
    }
  }, 100);
}

function takeCoffee() {             //функц взять кофе
  if (coffeeStatus != "ready") {           //если статус не равен готов-
    return;                                //- то ничего не делай
  }
  coffeeStatus = "waiting";            //переводит в статус вайтинг       
  coffeeCup.classList.add("d-none");   //убирает кружку 
  coffeeCup.style.cursor = "auto";    //забрали кружку, курсор стал обычным
  progressBar.style.width = "0";      //забрали кофе, полоска обнулилась
  changeDisplayText("Выберите кофе")  //забрали кофе, поменялась надпись на дисплее
}

function changeDisplayText(text) {    /*создаем функцию смена текста*/
  /*displayText.innerText = "<span>"+text+"</span>";;*/  /*нельзя вставлять html код*/
  displayText.innerHTML = "<span>"+text+"</span>"; /*можно*/
}


//------------------------------Drag `n` Drop(тащи и клади)-----------------------

let bills = document.querySelectorAll(".wallet img");

for(let i = 0; i < bills.length; i++) {
  bills[i].onmousedown = takeMoney;      //нажимаем и держим вызываем функцию
}

function takeMoney (event) {
  event.preventDefault();  //сбрасывает браузерный дрэгтдроп(события по умолчанию)
  
  let bill = this;
  let billCost = bill.getAttribute("cost");
  
  bill.style.position = "absolute";
  bill.style.transform = "rotate(90deg)"
  
  let billCoords = bill.getBoundingClientRect();    // координаты элемента
  let billWidth = billCoords.width;         
  let billHeight= billCoords.height;
  
  bill.style.top = event.clientY - billWidth/2 + "px"    //сдвигает центр купюры к мышке
  bill.style.left = event.clientX - billHeight/2 + "px"  //сдвигает центр купюры к мышке
  
  window.onmousemove = (event) => {                    // при нажатии двигается по координатам мышки
    bill.style.top = event.clientY - billWidth/2 + "px"   
    bill.style.left = event.clientX - billHeight/2 + "px"
  };
  
  bill.onmouseup = dropMoney    //отпустить купюру 
}

function dropMoney() {
  window.onmousemove = null; //отключаем движение за мышкой после отжатия клавиши  
}

  
  
  
  
  

