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
  bill.style.transform = "rotate(90deg)"     //поворачиваем купюру на 90градусов при нажатии
  
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
 let bill = this;
 let billCost = bill.getAttribute("cost");
 if (inAtm(bill)); {                           //если вызвана функция инатм то
   balance.value = +balance.value + +billCost        //купюра добавляется в баланс
   bill.remove();  //удаляется купюра при наведениее на атм
 }
}

function inAtm(bill) {         //
  let billCoord =  bill.getBoundingClientRect(); //координаты купюры
  let atm =  document.querySelector(".atm");      //создлаем переменную и обращаемся к классу      
  let atmCoord = atm.getBoundingClientRect();   //координаты атм
  
  let billLeftTopCornerX = billCoord.x //левый верхний край купюры
  let billLeftTopCornerY = billCoord.y
  
  let billRightTopCornerX = billCoord.x + billCoord.width; //правый верхний край купюры
  let billRightTopCornerY = billCoord.y
  
  let atmLeftTopCornerX = atmCoord.x;     //левый верхний край атм
  let atmLeftTopCornerY = atmCoord.y;
  
  let atmRightTopCornerX = atmCoord.x + atmCoord.width;    //правый верхний край атм
  let atmRightTopCornerY = atmCoord.y;
 
  let atmLeftBottomCornerX = atmCoord.x;                  //левый нижний край атм
  let atmLeftBottomCornerY = atmCoord.y + atmCoord.height/3;
  
  let atmRightBottomCornerX = atmCoord.x + atmCoord.width/3;    // правый нижний край атм
  let atmRightBottomCornerY = atmCoord.y + atmCoord.height/3;

  
 if(
   billLeftTopCornerX >= atmLeftTopCornerX
   && billLeftTopCornerY >= atmLeftTopCornerY
   && billRightTopCornerX <= atmRightTopCornerX
   && billRightTopCornerY >= atmRightTopCornerY
   
   && billLeftTopCornerX >= atmLeftBottomCornerX
   && billLeftTopCornerY <= atmLeftBottomCornerY
   ) {
     return true;
   } else {
     return false;
   }

}  
//--------------------------Сдача--------------------------------

let changeBtn = document.querySelector(".change")
changeBtn.onclick = takeChange;

function takeChange() {
  if (balance.value <= 0) {    // если боланс меньше или равно нулю  то
  changeBtn.oncklick = takeChange;   // возвращает кнопку в раб сост
    return;                        //  то ничего не делай
  }
  changeBtn.onclick = null           // отоключает кнопку во время выдачи сдачи
  if (balance.value - 10 >= 0) {      //если баланс больше 10 то
    setTimeout(() => {                // установка скорости выдачи
      tossCoin("10");                   //вызываем функуию выдать десяточку
      balance.value -= 10;               //при нажатии на десяточку вычетаем из баланса 
      return takeChange();             // **** функцию
    }, 300);                              //тайминг выдачи
  } else if (balance.value - 5 >= 0) {
    setTimeout(() => {
      tossCoin("5");
      balance.value -= 5;              
      return takeChange();
    }, 300);
  } else if (balance.value - 2 >= 0) {
     setTimeout(() => {
      tossCoin("2");
      balance.value -= 2;              
      return takeChange();
     }, 300);
  } else if (balance.value - 1 >= 0) {
     setTimeout(() => {
      tossCoin("1");
      balance.value -= 1;              
      return takeChange();
     }, 300);
  }
}

function tossCoin(cost) {
  let changeContainer = document.querySelector(".change-box");
  let changeContainerCoords = changeContainer.getBoundingClientRect();
  let coinSrc = "";
  
  
  
  switch (cost) {
    case "10":
      coinSrc = "img/10rub.png";
      break;
    case "5":
      coinSrc = "img/5rub.png";
      break;
    case "2":
      coinSrc = "img/2rub.png";
      break;
    case "1":
      coinSrc = "img/1rub.png";
      break;
   
    
  }
  /*changeContainer.innerHTML += `
  <img src="${coinSrc}" style="height: 50px">`*/   //один из способов добавить элемент
  
  let coin = document.createElement("img");
  coin.setAttribute("src", coinSrc);
  coin.style.height = "50px";  //высота монетки 50px
  coin.style.cursor = "pointer" //мышка палец при наведении на монетки
  coin.style.display = "inline-block"; // из строчнеого элемента делаем строчно-блочный
  coin.style.position = "absolute";   //
  coin.style.userSelect = "none";  //нельзя выделить монетки
  
  changeContainer.append(coin);   //прикрепить после внутри элемента
  /*changeContainer.prepand(coin); //прикрепить до    внутри элемента
  
  changeContainer.prepand(coin); //после контейнера
  changeContainer.prepand(coin); //перед контецнером
  
  changeContainer.replace(coin); //заменяет элементы*/
  
  coin.style.top = 3 + Math.round(Math.random() *(changeContainerCoords.height - 56)) + "px";
  coin.style.left = 3 + Math.round(Math.random() *(changeContainerCoords.width - 56)) + "px";
  
 coin.onclick = () => coin.remove();
 
  let coinSound = new Audio("sound/coindrop.mp3"); //добавляем звук
  // coinSound.src = "sound/coindrop.mp3";
  coinSound.play();  //проиграть   
}
  