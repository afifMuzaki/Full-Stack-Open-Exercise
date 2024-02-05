import Button from "./Button";
import CountryInfo from './CountryInfo';

const List = ({ countries, handleShowClick }) => {
    if (!countries) {
      return null;  
    }

    if (countries.length > 10) {
        return <p>To many matches, specify another filter</p>
    }

    if (countries.length < 1) {
        return <p>No search matches</p>
    }

    if (countries.length === 1) {
        return <CountryInfo country={countries[0]} />
    }

    return (
        <>
            {countries.map(country => 
                <p key={country.name.common}>
                    {country.name.common} <Button text='show' handleClick={() => handleShowClick(country.name.common)} />
                </p>
            )}
        </>
    );
}

export default List;