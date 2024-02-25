import { useState, useEffect } from "react";

function App() {

  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {

    const getCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        setCountries(data)
        setFiltered(data)
      }
      catch (err) {
        console.error(err)
      }
    }

    getCountries()

  }, [])

  useEffect(() => {
    if (search != "" && countries) {
      setFiltered(
        countries.filter(country => {
          const name = country.name.common
          return name.toLowerCase().includes(search)
        })
      )
    }
    else if(countries){
      setFiltered(countries)
    }
  }, [search])


  return (
    <div>

      <header>

        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for countries..." />

      </header>


      {countries && (
        <div className="contriesWrapper">
          {filtered.map(country => (
            <div key={country.cca2} className="countryCard">
              <img src={country.flags.png} alt={country.name.common} height={80} width={160} />
              <p>{country.name.common}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
