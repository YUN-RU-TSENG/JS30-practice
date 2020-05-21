(() => {
  const baseURL =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  const cities = [];
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => cities.push(...data))
    .catch((err) => console.error(err))

  const searchInput = document.querySelector(".search");
  const suggestions = document.querySelector(".suggestions");

  searchInput.addEventListener("input", displayKeyWord);

  /**
   *
   * 這是一組篩選符合輸入文字的 filter function
   * @param {*} Group 代表輸入的數組
   * @param {*} text 代表過濾的文字
   */
  function filterWord(Group, text){
    return Group.filter((item) => item.city.match(text) || item.state.match(text));
  }

  function formatNumber(number){
    return Number(number).toLocaleString('zh-tw')
  }

  /**
   *
   * 代表將篩選好的數組資料列印出來
   * @param {*} e 事件
   */
  function displayKeyWord(e) {
    const keyWord = e.currentTarget.value;
    !keyWord && location.reload(); // 每次不刪選時重新家載到最初頁面

    const regexp = new RegExp(keyWord, 'gi'); // 會每次編譯，使用/\/不會每次編譯
    const filterCities = filterWord(cities, regexp);

    suggestions.innerHTML = filterCities.map((place) => {
      const cityName = place.city.replace(regexp, `<span class="hl">${keyWord}</span>`)
      const stateName = place.state.replace(regexp, `<span class="hl">${keyWord}</span>`)

      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${formatNumber(place.population)}</span>
      </li>`
      //  <span class="population">${numeral(city.population).format(0,000)}</span>
    }).join('');
  }

})();