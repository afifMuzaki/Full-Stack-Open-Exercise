import Button from "./Button";

const Persons = ({ persons, handleDelete }) => {
    return (
        <>
            {persons.map(person =>
                <p key={person.id}>
                    {person.name} {person.number} <Button title='delete' handleClick={() => handleDelete(person.id, person.name)} />
                </p>
            )}
        </>
    );
}

export default Persons;