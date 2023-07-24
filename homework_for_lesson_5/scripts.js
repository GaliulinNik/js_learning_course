const place_name = "Омск"; //тут задаем город
const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de";
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`;
//const div = document.getElementById("air-pollution");
const canvas = document.getElementById("canvas"); //получаем элемент
const ctx = canvas.getContext("2d"); //настройка для рисования 2D

function createNode(element) {
  return document.createElement(element);
}
function append(parent, element) {
  return parent.appendChild(element);
}
//Рисуем вертикальную и горизонтальную оси
ctx.fillStyle = "black"; // Задаём чёрный цвет для линий
ctx.lineWidth = 2.0; // Ширина линии
ctx.beginPath(); // Запускает путь
ctx.moveTo(30, 0); // Указываем начальный путь
ctx.lineTo(30, 460); // Перемешаем указатель
ctx.lineTo(1500, 460); // Ещё раз перемешаем указатель
ctx.stroke(); // Делаем контур
// Размеаем Y
ctx.fillStyle = "black";
for (let i = 0; i < 100; i++) {
  ctx.fillText((5 - i) * 1 + " -", 10, i * 80 + 60);
}
ctx.fillStyle = "green";

fetch(API_URL_GEO_DATA)
  .then((resp) => resp.json())
  .then(function (data) {
    let strCoordinates =
      data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos; //получили координаты нашего города
    console.log(strCoordinates);
    let coordinates = strCoordinates.split(" "); //разбили строку на массив строк используя разделитель пробел
    const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`;
    fetch(API_OPEN_METEO)
      .then((resp) => resp.json())
      .then(function (data) {
        //время : количество частиц pm10 : количество частиц pm2_5
        for (let i = 0; i < data.hourly.time.length; i++) {
          // let ol = createNode("ol");
          // let hr = createNode("hr");
          // let p = createNode("p");
          // p.innerHTML = `Дата и время: ${data.hourly.time[i]} <br> pm10: ${data.hourly.pm10[i]} <br> pm2_5: ${data.hourly.pm2_5[i]}`;
          // append(ol, p);
          // append(ol, hr);
          // append(div, ol);
          var pm10 = data.hourly.pm10[i];
          var pm2_5 = data.hourly.pm2_5[i];
          ctx.fillRect(40 + i * 100, 460 - pm10, 50, pm10 * 10);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .catch(function (error) {
    console.log(error);
  });
