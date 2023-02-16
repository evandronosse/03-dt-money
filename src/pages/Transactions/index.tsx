import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { X } from 'phosphor-react'

import {
  PriceHighlight,
  TableScrollDesign,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { useContextSelector } from 'use-context-selector'
import { api } from '../../lib/axios'

export function Transactions() {
  async function handleDeleteTransaction(id: number) {
    const dataContent = document.getElementById(`${id}`)
    await api.delete(`/transactions/${id}`).then(() => dataContent?.remove())
  }

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TableScrollDesign>
          <TransactionsTable>
            <tbody>
              {transactions.map((transactions) => {
                return (
                  <tr key={transactions.id} id={`${transactions.id}`}>
                    <td width="50%">{transactions.description}</td>
                    <td>
                      <PriceHighlight variant={transactions.type}>
                        {transactions.type === 'outcome' && '- '}
                        {priceFormatter.format(transactions.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transactions.category}</td>
                    <td>
                      {dateFormatter.format(new Date(transactions.createdAt))}
                    </td>
                    <td
                      onClick={() => handleDeleteTransaction(transactions.id)}
                    >
                      <X />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </TransactionsTable>
        </TableScrollDesign>
      </TransactionsContainer>
    </div>
  )
}
