import { useState } from 'react';
import { useAsyncList } from '@react-stately/data';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, CircularProgress, Button, getKeyValue } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';

import './SalesPage.css';

const API = {
    GetSales: 'http://localhost:4000/api/sales',
    PostSale: 'http://localhost:4000/api/sales',
    PatchSale: (id) => `http://localhost:4000/api/sales/${id}`,
    DeleteSale: (id) => `http://localhost:4000/api/sales/${id}`,
};

const columns = [
    { key: 'id', label: 'ID', className: 'w-[10ch]', sortable: true },
    { key: 'created_at', label: 'Fecha', className: 'w-[25ch]', sortable: true },
    { key: 'income', label: 'Ingreso', className: 'w-[20ch]', sortable: true },
    { key: 'cost', label: 'Costo', className: 'w-[20ch]', sortable: true },
    { key: 'description', label: 'Descripción', className: '', sortable: false },
];

const NoSalesToShow = (passedProps) => {
    const defaultProps = { className: '' };
    const props = passedProps === undefined ? defaultProps : { ...defaultProps, ...passedProps };

    return (
        <p className={`flex flex-row justify-center self-center ${props.className}`}>
            <span className='mr-2'>No hay ventas para mostrar.</span>
            <Link to='new'>
                <span className='underline'>Registrar una</span>
            </Link>
            <span>.</span>
        </p>
    );
};

const SalesPage = (passedProps) => {
    const defaultProps = { className: '' };
    const props = passedProps === undefined ? defaultProps : { ...defaultProps, ...passedProps };

    const navigate = useNavigate();
    const [isFetchingSales, setIsFetchingSales] = useState(true);

    let sales = useAsyncList({
        async load({ signal }) {
            let res = await fetch(API.GetSales, { signal });
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
        <div className={`SalesPage flex flex-col gap-2 mt-auto mb-auto ${props.className}`}>
            <div className='m-auto w-[80rem] flex flex-row items-center'>
                <h1 className='text-blue-900 text-4xl font-bold'>Ventas</h1>
                <Button className='ml-auto bg-blue-900 text-white font-semibold tracking-widest rounded-full' onClick={() => navigate('new')}>Agregar</Button>
            </div>
            <Table 
            aria-label='Sales table'
            classNames={{
                base: 'm-auto max-h-[520px] max-w-7xl overflow-scroll overflow-x-hidden',
                table: 'min-h-[420px] p-4 bg-blue-100',
                th: 'bg-blue-800 text-white group-hover:text-white',
                loadingWrapper: 'grid items-center'
            }}
            sortDescriptor={sales.sortDescriptor}
            onSortChange={sales.sort}
            isStriped isHeaderSticky removeWrapper
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn 
                        key={column.key}
                        className={`tracking-wider ${column.className}`}
                        allowsSorting={column.sortable}
                        >{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody 
                items={sales.items}
                isLoading={isFetchingSales}
                loadingContent={<CircularProgress />}
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
