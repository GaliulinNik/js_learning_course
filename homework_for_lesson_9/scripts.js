function convertTemperature(value, unit) {
  if (unit === "celsius") {
    return ((value - 32) * 5) / 9;
  } else if (unit === "fahrenheit") {
    return (value * 9) / 5 + 32;
  }
}

document.getElementById("input").addEventListener("change", function () {
  const temperature = parseFloat(
    document.getElementById("temperature-input").value
  );
  const unit = document.getElementById("unit-select").value;
  const convertedTemperature = convertTemperature(temperature, unit);
  document.getElementById("result").textContent =
    convertedTemperature.toFixed(2);
});
