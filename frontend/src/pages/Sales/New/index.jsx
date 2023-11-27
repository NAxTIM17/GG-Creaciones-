import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { Input, Textarea, Button } from '@nextui-org/react';

const API = {
    PostSale: 'http://localhost:4000/api/sales',
};

const SalesNewPage = () => {
    const [cost, setCost] = useState(0);
    const [income, setIncome] = useState(0);
    const [description, setDescription] = useState('');
    const [requestState, setRequestState] = useState('default');
    const navigate = useNavigate();

    const costInputIsInvalid = cost <= 0;
    const incomeInputIsInvalid = income <= 0;
    const descriptionInputIsInvalid = description === '';
    const formIsInvalid = costInputIsInvalid || incomeInputIsInvalid || descriptionInputIsInvalid;
    const submitButtonIsDisabled = requestState === 'posting' || formIsInvalid;

    const submitButton = useMemo(() => {
        if (requestState === 'default') return { color: 'primary', text: 'Registrar' };
        if (requestState === 'posting') return { color: 'warning', text: 'Registrando' };
        if (requestState === 'posted') return { color: 'success', text: 'Éxito' };
        return { color: 'danger', text: 'Error' };
    }, [requestState]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formIsInvalid) return;

        if (requestState === 'posting') return;
        setRequestState('posting');

        axios.post(API.PostSale, { cost, income, description })
        .then((res) => {
            if (res.status === 201) {
                setCost(0);
                setIncome(0);
                setDescription('');
                setRequestState('posted');
            }
        })
        .catch((err) => {
            if (err) {
                console.error({ postSaleError: err });
            }
            setRequestState('failed');
        });
    };

    useEffect(() => {
        if ((requestState === 'posted' || requestState === 'failed') && (!costInputIsInvalid || !incomeInputIsInvalid || !descriptionInputIsInvalid)) {
            setRequestState('default');
        }
    }, [cost, income, description]);

    return (
        <div className='flex flex-col gap-2 mt-auto mb-auto'>
            <div className='m-auto w-[40rem] flex flex-row items-center'>
                <h1 className='text-blue-900 text-4xl font-bold'>Nueva venta</h1>
                <Button className='ml-auto bg-blue-900 text-white font-semibold tracking-widest rounded-full' onClick={() => navigate('/sales')}>Ventas</Button>
            </div>
            <form className='m-auto w-[40rem] flex flex-col gap-8 bg-blue-100 rounded-xl p-4' onSubmit={handleSubmit}>
                <div className='flex flex-row gap-4 items-center'>
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <Input 
                        isClearable
                        isRequired
                        size='lg'
                        type='number'
                        label='Costo'
                        variant='bordered'
                        labelPlacement='outside'
                        classNames={{
                            label: 'text-default-900 text-lg font-semibold',
                            inputWrapper: 'bg-blue-300 text-default-900',
                        }}
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-900">$</span>
                            </div>
                        }
                        color={costInputIsInvalid ? 'danger' : 'default'}
                        value={cost}
                        onChange={(event) => {
                            setCost(Number(event.target.value));   
                        }}
                        />
                        <Input 
                        isClearable
                        isRequired
                        size='lg'
                        type='number'
                        label='Ingreso'
                        variant='bordered'
                        labelPlacement='outside'
                        classNames={{
                            label: 'text-default-900 text-lg font-semibold',
                            inputWrapper: 'bg-blue-300 text-default-900',
                        }}
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-900">$</span>
                            </div>
                        }
                        color={incomeInputIsInvalid ? 'danger' : 'default'}
                        value={income}
                        onChange={(event) => {
                            setIncome(Number(event.target.value));   
                        }}
                        />
                    </div>
                    <div className='flex-1'>
                        <Textarea 
                        isRequired 
                        disableAutosize
                        isMultiline={false}
                        size='lg'
                        label='Descripción'
                        variant='bordered'
                        labelPlacement='outside'
                        classNames={{
                            label: 'text-default-900 text-lg font-semibold',
                            inputWrapper: 'text-default-900 bg-blue-300',
                            input: 'h-40'
                        }}
                        color={descriptionInputIsInvalid ? 'danger' : 'default'}
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);   
                        }}
                        />
                    </div>  
                </div>
                <Button 
                type='submit'
                color={submitButton.color}
                size='lg'
                className='font-bold w-1/2 m-auto'
                isDisabled={submitButtonIsDisabled}
                isLoading={requestState === 'posting'}
                >{submitButton.text}</Button>
            </form>
        </div>
    );
};

export default SalesNewPage;
