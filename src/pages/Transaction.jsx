import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleTransaction from '../components/Transaction/SingleTransaction';
import Button from '../components/Elements/Button/Button';

const Transaction = () => {
  const [historyTransactions, setHistoryTransactions] = useState([]);
  const [defaultLimit, setDefaultLimit] = useState(5);

  let defaultOffset = 0;

  const fetchHistoryTransaction = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${defaultOffset}&limit=${defaultLimit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistoryTransactions(response.data.data.records);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistoryTransaction();
  }, [defaultLimit]);

  const handleShowMore = () => {
    setDefaultLimit((prev) => prev + defaultLimit);
  };

  return (
    <main className='mt-14 flex flex-col gap-y-5'>
      <h2 className='text-lg font-semibold'>Semua Transaksi</h2>

      {historyTransactions.map((history) => {
        const date = new Date(history.created_on);
        const formattedDate = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(date);

        const formattedTime = new Intl.DateTimeFormat('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(date);

        return (
          <SingleTransaction
            key={history.invoice_number}
            transaction_type={history.transaction_type}
            total_amount={history.total_amount}
            description={history.description}
            formattedDate={formattedDate}
            formattedTime={formattedTime}
          />
        );
      })}

      <Button
        onClick={handleShowMore}
        classname={'text-red-500 font-semibold hover:font-bold w-fit mx-auto'}
      >
        Show More
      </Button>
    </main>
  );
};

export default Transaction;
