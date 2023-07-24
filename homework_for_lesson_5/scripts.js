const place_name = "Омск"; //тут задаем город
const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de";
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`;
//const div = document.getElementById("air-pollution");
const canvas = document.getElementById("canvas"); //получаем элемент
const ctx = canvas.getContext("2d"); //настройка для рисования 2D

//Рисуем вертикальную и горизонтальную оси
ctx.fillStyle = "black"; // Задаём чёрный цвет для линий
ctx.lineWidth = 2.0; // Ширина линии
ctx.beginPath(); // Запускает путь
ctx.moveTo(30, 0); // Указываем начальный путь
ctx.lineTo(30, 460); // Перемешаем указатель
ctx.lineTo(12100, 460); // Ещё раз перемешаем указатель
ctx.stroke(); // Делаем контур
// Размечаем Y
ctx.fillStyle = "black";
for (let i = 0; i < 100; i++) {
  ctx.fillText((8 - i) / 1 + " -", 10, i * 50 + 60);
  ctx.beginPath();
}
//сноски по цвету
ctx.fillText("pm10", 100, 30);
ctx.fillStyle = "green";
ctx.fillRect(70, 22, 20, 10);
ctx.fillStyle = "black";
ctx.fillText("pm2_5", 100, 50);
ctx.fillStyle = "blue";
ctx.fillRect(70, 42, 20, 10);

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
          ctx.fillStyle = "black";
          ctx.fillText(data.hourly.time[i], 20 + i * 100, 475);
          var pm10 = data.hourly.pm10[i];
          var pm2_5 = data.hourly.pm2_5[i];
          ctx.fillStyle = "green";
          ctx.fillRect(40 + i * 100, 460 - pm10 * 50, 25, pm10 * 50);
          ctx.fillStyle = "blue";
          ctx.fillRect(70 + i * 100, 460 - pm2_5 * 50, 25, pm2_5 * 50);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .catch(function (error) {
    console.log(error);
  });
