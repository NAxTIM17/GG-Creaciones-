const StatsOperationQuery = {
    GetByYear: `SELECT * FROM StatsByYear`,
    GetByMonth: `SELECT * FROM StatsByMonth`,
    GetByDay: `SELECT * FROM StatsByDay`,
};

function GetByYear(pool) {
    return new Promise((resolve, reject) => {
        pool.query(StatsOperationQuery.GetByYear, (err, results) => {
            if (err) {
                reject({ getStatsByYear: err });
                return;
            }

            if (!results.length) {
                resolve({ found: false, message: 'Could not find stats by year' });
                return;
            }

            resolve({ found: true, stats: results });
        });
    });
}

function GetByMonth(pool) {
    return new Promise((resolve, reject) => {
        pool.query(StatsOperationQuery.GetByMonth, (err, results) => {
            if (err) {
                reject({ getStatsByMonth: err });
                return;
            }

            if (!results.length) {
                resolve({ found: false, message: 'Could not find stats by month' });
                return;
            }

            resolve({ found: true, stats: results });
        });
    });
}

function GetByDay(pool) {
    return new Promise((resolve, reject) => {
        pool.query(StatsOperationQuery.GetByDay, (err, results) => {
            if (err) {
                reject({ getStatsByDay: err });
                return;
            }

            if (!results.length) {
                resolve({ found: false, message: 'Could not find stats by day' });
                return;
            }

            resolve({ found: true, stats: results });
        });
    });
}

const Stats = {
    GetByYear,
    GetByMonth,
    GetByDay,
};

export default Stats;
