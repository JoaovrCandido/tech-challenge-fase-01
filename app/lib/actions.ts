'use server';

import { z } from 'zod';

import { TransactionType } from '@/types/index';
import { TransactionInput } from '@/types/index';
import { POST } from '../api/transactions/route';

const formSchema = z.object({
    TransactionType: z.custom<TransactionType>((val) =>
        val === 'deposito' || val === 'transferencia'
    ),
    amount: z.coerce.number()
});

const CreateTransaction = formSchema.omit({});

export async function createTransaction(formData: FormData) {

    const { TransactionType, amount } = CreateTransaction.parse({
        TransactionType: formData.get('transactionType'),
        amount: formData.get('amount')
    });

    const transaction: TransactionInput = {
        type: TransactionType,
        amount: amount,
        description: ''
    }

    const request = new Request('http://localhost:3000/api/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await POST(request);
    const result = await response.json();

    console.log(TransactionType);
    console.log(amount);
    console.log(transaction);
}