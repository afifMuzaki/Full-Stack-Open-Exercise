import StatisticLine from './StatisticLine';

const Table = ({ datas }) => {
    return (
        <>
            <table cellPadding='2'>
                <tbody>
                    <StatisticLine text='good' value={datas.info[0]} />
                    <StatisticLine text='neutral' value={datas.info[1]} />
                    <StatisticLine text='bad' value={datas.info[2]} />
                    <StatisticLine text='all' value={datas.total} />
                    <StatisticLine text='average' value={datas.average} />
                    <StatisticLine text='positive' value={`${datas.positive} %`} />
                </tbody>
            </table>
        </>
    );
};

export default Table;