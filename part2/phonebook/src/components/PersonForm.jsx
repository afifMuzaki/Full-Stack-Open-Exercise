const PersonForm = ({ handleChange, handleSubmit, inputValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={inputValue.newName} onChange={handleChange.handleNameChange} />
                </div>
                <div>
                    number: <input value={inputValue.newNumber} onChange={handleChange.handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
};

export default PersonForm;