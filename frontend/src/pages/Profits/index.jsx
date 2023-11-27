import { useState } from 'react'
import ProfitsDay from './components/ProfitsDay'
import ProfitsMonth from './components/ProfitsMonth'
import ProfitsYear from './components/ProfitsYear'
import {Select, SelectSection, SelectItem} from '@nextui-org/react'

//interval: 'year' | 'month' | 'day'

const ProfitsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState()
    const periods = [
        {label: 'Día', value: 'day'},
        {label: 'Mes', value: 'month'},
        {label: 'Año', value: 'year'}
    ]
    const handleSelectionChange = (e) => {
        setSelectedPeriod(e.target.value)
    }
    return (
        <div className='min-w-full min-h-screen my-5'>
            <div className=''>
                <Select
                label='Periodo de tiempo'
                placeholder='Seleccione un periodo de tiempo'
                variant='bordered'
                className='max-w-sm'
                color='primary'
                onChange={handleSelectionChange}
                value={'day'}
                >
                    {periods.map((period) => (
                        <SelectItem 
                        key={period.value} 
                        value={period.value}
                        variant='flat'
                        color='primary'
                        >
                            {period.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="">
                {console.log(selectedPeriod)}
                {(selectedPeriod === 'day') ? <ProfitsDay/> : (selectedPeriod === 'month') ? <ProfitsMonth/>: (selectedPeriod === 'year') ? <ProfitsYear/> : <ProfitsDay/>}
            </div>
            
        </div>
    )
}

export default ProfitsPage
