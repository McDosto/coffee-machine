<!doctype html>
<html lang="ru">
  <head>
    <!--Required meta tags-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <!-- Bootstrap CSS-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">   
    
    <title>Кофе-машина</title>
  </head>
  <body>
    <div class="container">
      <div class="row coffee-machine">
        <div class="col-6 coffee-list">   <!--первая половина машины-->
          <div class="row flex-column p-3 h-100 justify-content-around">  <!--флекс колум делает из строки столбец--> <!--джустифай растянуть-->
            <div class="coffee-item col"  onclick="buyCoffee('Американо', 50, this)">  <!--онклик подключаем функцию при нажатии-->
              <img src="img/americano.png" alt="">
              <span>Американо - 50 руб.</span>
            </div>
            <div class="coffee-item col" onclick="buyCoffee('Капучино', 78, this)">
              <img src="img/cappuccino.png" alt="">
              <span>Капучино - 78 руб.</span>
            </div>
            <div class="coffee-item col" onclick="buyCoffee('Эспрессо', 21, this)">
              <img src="img/espresso.png" alt="">
              <span>Эспрессо - 21 руб.</span>
            </div>
            <div class="coffee-item col" onclick="buyCoffee('Латтэ', 115, this)">
              <img src="img/latte.jpg" alt="">
              <span>Латтэ - 115 руб.</span>
            </div>
          </div>
        </div>
        <div class="col-6 coffee-oper"> <!--вторая половина машины-->
          <div class="row p-3">        <!-- p-3 отступ бутстрап-->
            <div class="col-6">
              <div class="display">       <!--дисплей и прогрессбар-->
                <p class="display-text">Выберите кофе</p>
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div> <!--прогресс бар с бутстрапа-->
                </div>
              </div>
              <div class="coffee-cup ">  <!--кружка-->
                <img class="d-none" src="img/americano.png" alt="">
              </div>
            </div>
            <div class="col-6"> <!--вторая часть второй половины-->
              <div class="input-group mb-3">  <!--строка с балансом-->
                <input type="text" class="form-control balance" placeholder="Баланс" aria-label="Имя получателя" aria-describedby="basic-addon2"> <!--создаем класс баланс и вызываем в js-->
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">&#8381</span>  <!--внутри код символа-->   <!--input-->
                </div>
              </div>
              <div class="atm">                          <!--купюроприемник-->
                <img src="img/bill_acc.png" alt="">
              </div>
              <button class="btn btn-primary btn-block mt-2 change">Сдача</button> <!--примари цвет кнопки, блок ширина-->
              <div class="change-box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wallet">   <!--кошелек-->
      <img src="img/50rub.jpg" alt="" cost="50">     <!--придумали атриут кост-->
      <img src="img/100rub.jpg" alt="" cost="100">
      <img src="img/500rub.jpg" alt="" cost="500">
    </div>

    <!-- Optional JavaScript -->
    <script src="script.js"></script>
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>