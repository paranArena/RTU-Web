import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { SERVER_API } from '../../../config';

ChartJS.register(ArcElement, Tooltip, Legend);

function RentalStatusChart() {
  const [mount, setMount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showData, setShowData] = useState({
    labels: ['미반납', '대여 중', '예약', '보관'],
    datasets: [
      {
        label: '#',
        data: [2, 4, 5, 10],
        backgroundColor: [
          '#F46E49',
          '#FFC531',
          '#7DABCF',
          '#868E96',
        ],
        borderColor: [
          '#F46E49',
          '#FFC531',
          '#7DABCF',
          '#868E96',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (mount === 0) {
      setMount(1);
    } else {
      const clubId = window.location.href.slice((window.location.href.search('=') + 1));

      axios.get(
        `${SERVER_API}/clubs/${clubId}/rentals/search/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      ).then((res) => {
        setStatus(res.data.data);
      })
        .catch((historyErr) => {
          console.log(historyErr);
        });
    }
  }, [mount]);

  return (
    <div>
      <Doughnut data={showData} />
    </div>
  );
}

export default RentalStatusChart;
