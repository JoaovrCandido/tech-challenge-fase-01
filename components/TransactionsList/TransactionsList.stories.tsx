import type { Meta, StoryObj } from "@storybook/nextjs";
import TransactionsList from "./TransactionsList";
import { http, delay, HttpResponse } from "msw";
import { Transaction } from "@/types";
import { SWRConfig } from "swr";

const meta = {
  title: "Components/Transaction",
  component: TransactionsList,
  decorators: [
    (Story) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <Story />
      </SWRConfig>
    ),
  ],
} satisfies Meta<typeof TransactionsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "deposito",
    value: 1000,
    date: "2025-10-13",
    description: "Depósito em conta",
  },
  {
    id: 2,
    type: "transferencia",
    value: 200,
    date: "2025-10-14",
    description: "Transferência para outra conta",
  },
  {
    id: 3,
    type: "deposito",
    value: 100,
    date: "2025-10-14",
    description: "",
  },
];

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/transactions", () => {
          return HttpResponse.json(mockTransactions);
        }),
      ],
    },
  },
};

export const WithError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/transactions", () => {
          return HttpResponse.json(null, { status: 500 });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/transactions", async () => {
          await delay('infinite');

          return HttpResponse.json([]);
        }),
      ],
    },
  },
};
