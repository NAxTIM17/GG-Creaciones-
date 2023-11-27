import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, CircularProgress} from '@nextui-org/react'
import {useAsyncList} from '@react-stately/data'
import { useState } from 'react'

const columns = [
    {key:'Income', label: 'INGRESOS',classname:'w-[2ch]', sortable: true},
    {key:'Cost', label: 'COSTOS',classname:'w-[2ch]', sortable: true},
    {key:'Sales', label: 'VENTAS',classname:'w-[2ch]', sortable: true},
    {key:'Day', label: 'DIA', classname:'w-[2ch]', sortable: true},
]
const ProfitsDay = () => {
    const [isFetchingProfits, setIsFetchingProfits] = useState(true)

    let profits = useAsyncList({
        async load({signal}) {
            let res = await fetch('http://localhost:4000/api/stats/day', {
                signal,
            })
            let json = await res.json()
            setIsFetchingProfits(false)

            return {
                items: json.stats,
            }
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                let first = a[sortDescriptor.column];
                let second = b[sortDescriptor.column];
                let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                if (sortDescriptor.direction === 'descending') {
                    cmp *= -1
                }
                return cmp
                }),
            }
        },
    })
    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-blue-900 text-4xl font-bold text-center'>
                Estadísticas por día
            </h1>
            <Table 
            aria-label='Tabla de ganancias del dia'
            classNames={{
                base: 'm-auto max-h-[520px] max-w-2xl overflow-scroll overflow-x-hidden rounded-lg',
                table: 'bg-blue-100',
                th: 'h-10 bg-blue-800 text-white group-hover:text-white',
                loadingWrapper: 'grid items-center'
            }}
            sortDescriptor={profits.sortDescriptor}
            onSortChange={profits.sort}
            isStriped isHeaderSticky removeWrapper   
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn 
                        key={column.key}
                        className={`tracking-wider ${column.classname}`}
                        allowsSorting={column.sortable}
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                    
                <TableBody 
                items={profits.items} 
                isLoading={isFetchingProfits}
                loadingContent={<CircularProgress />}
                emptyContent={'Nada que mostrar'}
                >
                    {(item) => (
                        
                        <TableRow 
                        key={profits.items[item]+1}
                        className=''
                        >
                            {(columnKey) => 
                                <TableCell
                                >
                                    {getKeyValue(item, columnKey)}
                                </TableCell>
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default ProfitsDay