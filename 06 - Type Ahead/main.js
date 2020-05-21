(() => {
  var baseURL =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  var cities = [];
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => cities.push(...data));

  var searchInput = document.querySelector(".search");
  var suggestions = document.querySelector(".suggestions");
  console.log("cities", cities);

  searchInput.addEventListener("input", displayKeyWord);

  /**
   *
   * 這是一組篩選符合輸入文字的 filter function
   * @param {*} Group 代表輸入的數組
   * @param {*} text 代表過濾的文字
   */
  function filterWord(Group, text){
    return Group.filter((item) => {
      return item.city.match(text) || item.state.match(text);
    });
  }

  /**
   *
   * 代表將篩選好的數組資料列印出來
   * @param {*} e 事件
   */
  function displayKeyWord(e) {
    const keyWord = e.currentTarget.value;
    const regexp = new RegExp(keyWord, 'gi'); // 會每次編譯，使用/\/不會每次編譯
    const filterCities = filterWord(cities, regexp);

    const displayCity = filterCities.map((place) => {
      const cityName = place.city.replace(regexp, `<span class="hl">${keyWord}</span>`)
      const stateName = place.state.replace(regexp, `<span class="hl">${keyWord}</span>`)

      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${Number(place.population).toLocaleString('zh-tw')}</span>
      </li>`
      //  <span class="population">${numeral(city.population).format(0,000)}</span>
    }).join('');

    suggestions.innerHTML = displayCity;
  }

})();
