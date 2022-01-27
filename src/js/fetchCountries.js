function fetchCountries(searchQuery) {
  const url = `https://restcountries.com/v2/name/${searchQuery}`;

  return (
    fetch(url)
      .then(response => response.json())
      // .then(({ articles }) => articles)
      .catch(error => console.error(error))
  );
}
export default fetchCountries;
