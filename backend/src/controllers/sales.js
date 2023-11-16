const SaleOperationQuery = {
    Create: `
        INSERT INTO sale (income, cost, description) VALUES (?, ?, ?)
    `,
    Get: `
        SELECT * FROM sale
    `,
    GetByID: `
        SELECT * FROM sale s WHERE s.id = ?
    `,
    Modify: `
        UPDATE sale s 
        SET 
            s.income = IF(? IS NULL, s.income, ?),
            s.cost = IF(? IS NULL, s.cost, ?),
            s.description = IF(? IS NULL, s.description, ?)
        WHERE s.id = ?
    `,
    Delete: `
        DELETE FROM sale s WHERE s.id = ?
    `,
};

function Create(pool, payload) {
    if (payload.income <= 0 || payload.cost <= 0 || payload.description === '') {
        resolve({ created: false, message: 'Income and cost must be greater than zero, and description can\'t be empty' });
        return;
    }

    return new Promise((resolve, reject) => {
        pool.query(SaleOperationQuery.Create, [payload.income, payload.cost, payload.description], (err, results) => {
            if (err) {
                reject({ createSaleError: err });
                return;
            }

            if (!results.affectedRows) {
                resolve({ created: false, message: 'Could not create the sale' });
                return;
            }

            resolve({ created: true, sale: { sale_id: results.insertId } });
        });
    });
}

function Get(pool, payload) {
    const query = payload.sale_id === undefined ? SaleOperationQuery.Get : SaleOperationQuery.GetByID;

    return new Promise((resolve, reject) => {
        pool.query(query, payload.sale_id === undefined ? [] : [payload.sale_id], (err, results) => {
            if (err) {
                reject({ getSalesError: err });
                return;
            }

            if (!results.length) {
                const message = payload.sale_id === undefined ? 'Could not find the sales' : 'Could not find a sale with that ID';
                resolve({ found: false, message });
                return;
            }

            if (payload.sale_id === undefined) {
                resolve({ found: true, sales: results });
                return;
            }

            resolve({ found: true, sale: results[0] });
        });
    });
}

function Modify(pool, payload) {
    if (payload.sale_id === undefined) {
        resolve({ created: false, message: 'No sale ID provided' });
        return;
    }

    if (payload.income <= 0 || payload.cost <= 0 || payload.description === '') {
        resolve({ created: false, message: 'Income and cost must be greater than zero, and description can\'t be empty' });
        return;
    }

    return new Promise((resolve, reject) => {
        pool.query(
            SaleOperationQuery.Modify, 
            [payload.income ?? null, payload.income,
             payload.cost ?? null, payload.cost,
             payload.description ?? null, payload.description,
             payload.sale_id],
            (err, results) => {
            if (err) {
                reject({ modifySaleError: err });
                return;
            }

            if (!results.changedRows) {
                resolve({ done: false, message: 'Could not modify the sale' });
                return;
            }

            resolve({ done: true });
        })
    });
}

function Delete(pool, payload) {
    if (payload.sale_id === undefined) {
        resolve({ done: false, message: 'No sale ID provided' });
        return;
    }

    return new Promise((resolve, reject) => {
        pool.query(SaleOperationQuery.Delete, [payload.sale_id], (err, results) => {
            if (err) {
                reject({ deleteSaleError: err });
                return;
            }

            if (!results.affectedRows) {
                resolve({ done: false, message: 'Could not delete the sale' });
                return;
            }
            
            resolve({ done: true });
        });
    });
}

const Sale = {
    Create,
    Get,
    Modify,
    Delete,
};

export default Sale;
