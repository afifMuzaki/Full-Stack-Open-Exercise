const Search = ({ handleChange, value }) => {
    return (
        <div>
            <label> 
                find countries <input type="text" value={value} onChange={handleChange} />
            </label>
        </div>
    );
};

export default Search;