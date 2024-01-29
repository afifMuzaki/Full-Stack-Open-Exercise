import Title from './Title';
import Table from './Table';

const Statistic = ({ datas }) => {
    if (datas.total === 0) {
        return (
            <>
                <Title title='statistics' />
                <p>No feedback given</p>
            </>
        );
    }

    return (
        <>
            <Title title='statistics' />
            <Table datas={ {...datas} } />
        </>
    );
};

export default Statistic;