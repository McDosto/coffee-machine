"use strict"      /*строгий режим*/

let balance = document.querySelector(".balance") /*создаем переменную баланс иобращаемся к классу*/  

function buyCoffee(name, cost) {
  /*alert(`Вы заказали ${name}. Цена: ${cost}`);*/
  /*alert(balance.value);*/
  let afterBuyValue = +balance.value - cost; 
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) { /*палки или*/
    alert("Недостаточно средств!");
    return;
  }
  balance.value = (+balance.value - cost).toFixed(2);  /*туфиксед количество цифр после точки*/
  alert("Ваш " + name + " готовится!");
}
