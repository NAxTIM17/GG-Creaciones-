import axios from 'axios';
import { useState } from 'react';
import { useAsyncList } from '@react-stately/data';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, CircularProgress, Button, Tooltip, Input, getKeyValue } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';

import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import CheckIcon from '../../components/Icons/CheckIcon';
import CancelIcon from '../../components/Icons/CancelIcon';

const API = {
    GetSales: 'http://localhost:4000/api/sales',
    PostSale: 'http://localhost:4000/api/sales',
    PatchSale: (id) => `http://localhost:4000/api/sales/${id}`,
    DeleteSale: (id) => `http://localhost:4000/api/sales/${id}`,
};

const IconButtonWithTooltip = (passedProps) => {
    const defaultProps = {
        tooltip: 'tooltip here',
        label: '',
        color: 'default',
        className: {
            base: '',
            span: '',
            button: '',
        },
        icon: () => { return ( <></> ); },
        onClick: () => {},
    };
    const props = passedProps === undefined ? defaultProps : { ...defaultProps, ...passedProps };

    return (
         <Tooltip content={props.tooltip} className={props.className.base} color={props.color}>
            <span className={`text-2xl cursor-pointer active:opacity-50 ${props.className.span}`}>
                <Button isIconOnly onClick={props.onClick} aria-label={props.label} className={props.className.button} color={props.color}>
                    {props.icon}
                </Button>
            </span>
        </Tooltip>
    );
};

const DecideButton = (passedProps) => {
    const defaultProps = {
        className: {
            base: '',
            confirmButton: {
                base: '',
                span: '',
                button: '',
            },
            cancelButton: {
                base: '',
                span: '',
                button: '',
            },
        },
        onConfirmClick: () => {},
        onCancelClick: () => {}
    };
    const props = passedProps === undefined ? defaultProps : { ...defaultProps, ...passedProps };
    
    return (
        <div className={`flex flex-row gap-4 ${props.className.base}`}>
            <IconButtonWithTooltip 
            className={props.className.confirmButton}
            color='success'
            tooltip='Confirmar'
            label='Confirmar'
            icon={<CheckIcon />}
            onClick={props.onConfirmClick}
            />
            <IconButtonWithTooltip 
            className={props.className.cancelButton}
            color='danger'
            tooltip='Cancelar'
            label='Cancelar'
            icon={<CancelIcon />}
            onClick={props.onCancelClick}
            />
        </div>
    );
};

const ItemActions = (passedProps) => {
    const defaultProps = {
        className: '',
        onEditClick: () => {},
        onEditConfirmClick: () => {},
        onEditCancelClick: () => {},
        onDeleteClick: () => {},
        onDeleteConfirmClick: () => {},
        onDeleteCancelClick: () => {},
    };
    const props = passedProps === undefined ? defaultProps : { ...defaultProps, ...passedProps };

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    if (isEditing) return (
        <DecideButton
        onConfirmClick={() => {
            props.onEditConfirmClick();
            setIsEditing(false);
        }}
        onCancelClick={() => {
            props.onEditCancelClick();
            setIsEditing(false);
        }}
        />
    );

    if (isDeleting) return (
        <DecideButton
        onConfirmClick={() => {
            props.onDeleteConfirmClick();
            setIsDeleting(false);
        }}
        onCancelClick={() => {
            props.onDeleteCancelClick();
            setIsDeleting(false);
        }}
        />
    );

    return (
        <div className='flex flex-row gap-4 items-center justify-start'>
            <IconButtonWithTooltip 
                color='danger'
                tooltip='Eliminar venta'
                label='Eliminar'
                icon={<DeleteIcon />}
                onClick={() => {
                    setIsDeleting(true);
                    props.onDeleteClick();
                }}
            />
            <IconButtonWithTooltip 
                color='warning'
                tooltip='Editar venta'
                label='Editar'
                icon={<EditIcon />}
                onClick={() => {
                    setIsEditing(true);
                    props.onEditClick();
                }}
            />
        </div>
    );
};

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

const commitEdit = (sale, onSuccess, onError, onFinally) => {
    console.log(sale);
    axios.patch(API.PatchSale(sale.id), { ...sale })
    .then((res) => {
        console.log(res);
        if (res.data.done && onSuccess !== undefined) onSuccess();
    })
    .catch((err) => {
        console.error({ commitEditError: err });
        if (onError !== undefined) onError(err);
    })
    .finally(() => {
        if (onFinally !== undefined) onFinally();
    });
};

const commitDelete = (sale, onSuccess, onError, onFinally) => {
    axios.delete(API.DeleteSale(sale.id))
    .then((res) => {
        if (res.data.done && onSuccess !== undefined) onSuccess();
    })
    .catch((err) => {
        console.error({ commitDeleteError: err });
        if (onError !== undefined) onError(err);
    })
    .finally(() => {
        if (onFinally !== undefined) onFinally();
    });
};

const columns = [
    { key: 'id', label: 'ID', className: 'w-[10ch]', sortable: true },
    { key: 'created_at', label: 'Fecha', className: 'w-[25ch]', sortable: true },
    { key: 'income', label: 'Ingreso', className: 'w-[25ch]', sortable: true },
    { key: 'cost', label: 'Costo', className: 'w-[25ch]', sortable: true },
    { key: 'description', label: 'Descripción', className: '', sortable: false },
    { key: 'actions', label: 'Acciones', className: 'w-[25ch]', sortable: false },
];

const SalesPage = (passedProps) => {
    const defaultProps = { className: '' };
    const props = passedProps === undefined ? defaultProps : { ...defaultProps, ...passedProps };

    const navigate = useNavigate();
    const [isFetchingSales, setIsFetchingSales] = useState(true);

    const [editingSale, setEditingSale] = useState(null);

    let sales = useAsyncList({
        async load({ signal }) {
            try {
                let res = await fetch(API.GetSales, { signal });
                let json = await res.json();
                setIsFetchingSales(false);

                return { items: json.sales.map((v) => ({ ...v, isEditing: false })) };
            } catch (err) {
                console.error({ getSalesError: err });

                return { items: [] };
            }
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
                table: 'min-h-[420px] bg-blue-100',
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
                        {(columnKey) => {
                            const isEditableColumn = ['income', 'cost', 'description'].includes(columnKey);
                            const isNumericColumn = ['income', 'cost'].includes(columnKey);

                            if (columnKey === 'actions') return (
                                <TableCell>
                                    <ItemActions 
                                        onEditClick={() => {
                                            if (editingSale !== null) {
                                                sales.update(editingSale.id, { ...editingSale, isEditing: false });
                                            }

                                            setEditingSale(item);
                                            sales.update(item.id, { ...item, isEditing: true });
                                        }}
                                        onEditCancelClick={() => {
                                            sales.update(item.id, { ...editingSale, isEditing: false });
                                            setEditingSale(null);
                                        }}
                                        onEditConfirmClick={() => {
                                            commitEdit(item, () => {
                                                sales.reload();
                                            });
                                        }}
                                        onDeleteConfirmClick={() => {
                                            commitDelete(item, () => {
                                                sales.reload();
                                            });
                                        }}
                                    />
                                </TableCell>
                            );

                            if (item.isEditing && isEditableColumn) return (
                                <TableCell>
                                    <Input 
                                    isClearable
                                    size='sm'
                                    type={isNumericColumn ? 'number' : 'text'}
                                    value={getKeyValue(item, columnKey)}
                                    onChange={(event) => {
                                        sales.update(item.id, { ...item, [columnKey]: event.target.value });
                                    }}
                                    onClear={() => {
                                        sales.update(item.id, { ...item, [columnKey]: '' });
                                    }}
                                    startContent={isNumericColumn && (
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    )}
                                    />
                                </TableCell>
                            );

                            const text = `${isNumericColumn ? '$' : ''}${getKeyValue(item, columnKey)}`;

                            return (
                                <TableCell>{text}</TableCell>
                            );
                        }}
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    );
};

export default SalesPage;
