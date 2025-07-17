const apiKey = "ba9154d440a14442e8f73405d317962e"; // vendos çelësin tënd këtu

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const input = document.getElementById("userLocation");
  const result = document.getElementById("weatherResult");

  searchBtn.addEventListener("click", () => {
    const city = input.value.trim();

    if (city === "") {
      alert("Të lutem shkruaj emrin e qytetit.");
      return;
    }

    // API call
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sq`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Qyteti nuk u gjet.");
        }
        return response.json();
      })
      .then(data => {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        result.innerHTML = `
          <h2>${name}</h2>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
          <p><strong>Temperatura:</strong> ${temp}°C</p>
          <p><strong>Përshkrimi:</strong> ${description}</p>
          <p><strong>Lagështia:</strong> ${humidity}%</p>
          <p><strong>Shpejtësia e erës:</strong> ${speed} m/s</p>
        `;

        result.style.display = "block"; // e shfaq kartelën
      })
      .catch(error => {
        result.innerHTML = `<p style="color:red;">${error.message}</p>`;
        result.style.display = "block";
      });
  });
});

