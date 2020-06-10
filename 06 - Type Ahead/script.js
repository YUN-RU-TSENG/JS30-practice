(() => {
  const baseURL =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  const searchInput = document.querySelector(".search"),
        suggestions = document.querySelector(".suggestions"),
        cities = [];
        
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      cities.push(...data);
      searchInput.addEventListener("input", displayKeyWord);
    })
    .catch((err) => console.error(err));

  /**
   *
   * 這是一組篩選符合輸入文字的 filter function
   * @param {*} font 過濾的文字
   * @param {*} places 輸入的數組
   * @return 過濾 font 後剩下的數組內容
   */
  function filterWord(places, font) {
    return places.filter(
      (place) => place.city.match(font) || place.state.match(font)
    );
  }

  function formatNumber(number) {
    return Number(number).toLocaleString("zh-tw");
  }

  /**
   *
   * 將篩選好的數組資料列印出來，該函數將會將篩選好的陣列內容列印到畫面上
   * @param {*} e 事件
   */
  function displayKeyWord(e) {
    const keyWord = e.currentTarget.value;
    !keyWord && location.reload(); // 每次不刪選時重新加載到最初頁面

    const regexp = new RegExp(keyWord, "gi"),
          filterCities = filterWord(cities, regexp);

    suggestions.innerHTML = filterCities
      .map((place) => {
        const cityName = place.city.replace(
          regexp,
          `<span class="hl">${keyWord}</span>`
        );
        const stateName = place.state.replace(
          regexp,
          `<span class="hl">${keyWord}</span>`
        );

        return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${formatNumber(place.population)}</span>
      </li>`;
        //  <span class="population">${numeral(city.population).format(0,000)}</span> 使用 library 解決
      })
      .join("");
  }
})();
