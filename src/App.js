import { useState, useEffect } from "react";

function App() {

  const [countries, setCountries] = useState(null)

  useEffect(() => {

    const getCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        setCountries(data)
      }
      catch (err) {
        console.error(err)
      }
    }

    getCountries()

  }, [])

  const contriesWrapper = {
    display:"flex",
    gap: "20px",
    flexWrap : "wrap",
    justifyContent:'center',
    padding: "30px"
  }

  const countryStyle ={
    textAlign : "center",
    border:'1px solid #ccc',
    padding: "10px",
    borderRadius: '10px',
    flex:1
  }

  return (
    <div>
      <h1>New</h1>
      {countries && (
        <div style={contriesWrapper}>
          {countries.map(country => (
            <div key={country.cca2} style={countryStyle}>
              <img src={country.flags.png} alt={country.name.common} height={80} width={160}  />
              <h5>{country.name.common}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
