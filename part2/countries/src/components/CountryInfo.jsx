import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h4>languages:</h4>
            <ul>
                {
                    Object.keys(country.languages)
                        .map(langKey => <li key={country.languages[langKey]}>{country.languages[langKey]}</li>)
                }
            </ul>
            <br />
            <img src={country.flags.png} alt={country.flags.alt} />
            <WeatherInfo capital={country.capital[0]} />
        </>
    );
};

export default CountryInfo;