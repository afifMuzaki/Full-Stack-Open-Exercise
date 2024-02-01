import Header from './Header';
import Content from './Content';

const Course = ({ courses }) => {

    const sumExercise = (parts) => {
        return parts.map(part => part.exercises)
        .reduce((acc, cur) => acc + cur);
    };

    return (
        <>
            <Header course='Web development curriculum' />
            {courses.map(course => 
                <Content 
                    key={course.id} 
                    parts={course.parts} 
                    title={course.name} 
                    courseSum={sumExercise(course.parts)}/>
            )}
        </>
    );
};

export default Course;