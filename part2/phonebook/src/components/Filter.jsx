const Filter = ({ handleChange, filterValue }) => {
    return (
        <div>
            filter shown with <input value={filterValue} onChange={handleChange} />
        </div>
    );
};

export default Filter;