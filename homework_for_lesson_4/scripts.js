const place_name = "Омск"; //тут задаем город
const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de";
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`;
const div = document.getElementById("air-pollution");

function createNode(element) {
  return document.createElement(element);
}
function append(parent, element) {
  return parent.appendChild(element);
}

fetch(API_URL_GEO_DATA)
  .then((resp) => resp.json())
  .then(function (data) {
    let strCoordinates =
      data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos; //получили координаты нашего города
    let coordinates = strCoordinates.split(" "); //разбили строку на массив строк используя разделитель пробел
    const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`;
    fetch(API_OPEN_METEO)
      .then((resp) => resp.json())
      .then(function (data) {
        //время : количество частиц pm10 : количество частиц pm2_5
        let arr = [];
        arr = data.hourly.time;
        console.log(arr.lenght);
        // for (let i = 0; i < 119; i++) {
        //   let ol = createNode("ol");
        //   let hr = createNode("hr");
        //   let p = createNode("p");
        //   p.innerHTML = `Дата и время: ${data.hourly.time[i]} <br> pm10: ${data.hourly.pm10[i]} <br> pm2_5: ${data.hourly.pm2_5[i]}`;
        //   append(ol, p);
        //   append(ol, hr);
        //   append(div, ol);
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .catch(function (error) {
    console.log(error);
  });
