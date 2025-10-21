'use client';

import { useState } from 'react';
import { createTransaction } from '@/app/lib/actions';

export default function Transaction() {
    const [transactionType, setTransactionType] = useState('');
    const [value, setValue] = useState('');

    return (<div >
        <h3>Nova transação</h3>
        <form action={createTransaction}>
            <select
                id="transactionType"
                name="transactionType"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}

            >
                <option value="">Selecione o tipo de transação</option>
                <option value="deposito">Depósito</option>
                <option value="transferencia">Transferência</option>
            </select>

            <p>Valor</p>
            <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div>
                <button type="submit">Concluir transação</button>
            </div>

        </form>
    </div>)

}