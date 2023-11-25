import { useState } from 'react';
import { useAsyncList } from '@react-stately/data';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, CircularProgress, getKeyValue } from "@nextui-org/react";
import { Link } from 'react-router-dom';

import './SalesPage.css';

const columns = [
    { key: 'id', label: 'ID', className: 'w-[10ch]' },
    { key: 'created_at', label: 'Date', className: 'w-[25ch]' },
    { key: 'income', label: 'Income', className: 'w-[20ch]' },
    { key: 'cost', label: 'Cost', className: 'w-[20ch]' },
    { key: 'description', label: 'Description', className: '' },
];

const NoSalesToShow = (passedProps) => {
    const defaultProps = { className: '' };
    const props = passedProps === undefined ? defaultProps : { ...defaultProps, ...passedProps };

    return (
        <p className={`flex flex-row justify-center self-center ${props.className}`}>
            <span className='mr-2'>{`There's no sales to show.`}</span>
            <Link to='new'>
                <span className='underline'>Register one</span>
            </Link>
            <span>.</span>
        </p>
    );
};

const SalesPage = (passedProps) => {
    const defaultProps = { className: '' };
    const props = passedProps === undefined ? defaultProps : { ...defaultProps, ...passedProps };

    const [isFetchingSales, setIsFetchingSales] = useState(true);

    let sales = useAsyncList({
        async load({ signal }) {
            let res = await fetch('http://localhost:4000/api/sales', { signal });
            let json = await res.json();
            setIsFetchingSales(false);

            return {
                items: json.sales,
            };
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp = first < second ? -1 : 1;

                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    return (
        <div className={`SalesPage mt-auto mb-auto ${props.className}`}>
            <Table 
            aria-label='Sales table'
            classNames={{
                base: 'max-h-[520px] overflow-scroll',
                table: 'min-h-[420px]',
            }}
            sortDescriptor={sales.sortDescriptor}
            onSortChange={sales.sort}
            isStriped isHeaderSticky
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn 
                                    className={`border-b-4 border-gray-600 ${column.className}`}
                                    key={column.key}
                                    allowsSorting={column.key === 'created_at'}
                                    >{column.label}</TableColumn>}
                </TableHeader>
                <TableBody 
                items={sales.items}
                isLoading={isFetchingSales}
                loadingContent={<CircularProgress className='m-auto' />}
                emptyContent={<NoSalesToShow />}
                >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    );
};

export default SalesPage;
