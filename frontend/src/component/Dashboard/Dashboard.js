import React, { useEffect } from 'react'
import './dashboard.css'
import {useSelector,useDispatch} from "react-redux"
import Loader from '../loader/loader'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { useAlert } from 'react-alert';
import { clearError, getAnalytics } from '../../actions/adminAction';
import { useState } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
);

function Dashboard() {
  const dispatch=useDispatch()
  const alert = useAlert()

  const [categoryLabel,setCategoryLabel]=useState([])
  const [categoryStockData,setCategoryStockData]=useState([])
  const [categorySoldData,setCategorySoldData]=useState([])

  const {loading,error,analytics} = useSelector((state)=>state.admin)

  const colors = [
    ['#EC4E4D', '#FF9790'],
    ['#45D166', '#7FEB7C'],
    ['#91BEFD', '#4DA4D7'],
    ['#BC92FE', '#A94FD7'],
    ['rgb(189 21 93 / 72%)', '#ffaffaf5']
  ]

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Amount',
      },
    },
  };
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [{
      label: "TOTAL AMOUNT",
      backgroundColor: ["#FC7E7A"],
      hoverBackgroundColor: ["rgb(112,56,76)"],
      data: [0, analytics.amount]
    }]
  }
  const stockOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock',
      },
    },
  };
  const stockState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [{
      backgroundColor: ["#FC7E7A", "#61D0C6"],
      hoverBackgroundColor: ["#D7679F", "#58DA6D"],
      height: ["50rem"],
      data: [analytics.outOfStock, analytics.inStock]
    }]
  }
  const userOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User',
      },
    },
  };
  const userState = {
    labels: [ "Old User","New User"],
    datasets: [{
      backgroundColor: ["#FFD633","#00BCD4" ],
      hoverBackgroundColor: ["#228E5D", "#FFB1C1"],
      data: [analytics.oldUser, analytics.newUser]
    }]
  }


  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category wise stock',
      },
    },
  };
  const categoryState = {
    labels: categoryLabel,
    datasets: [
      {
        label: 'Stock',
        data: categoryStockData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Sold',
        data: categorySoldData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  useEffect(() => {
    if(!loading && analytics.categoryStock){
      setCategoryLabel(analytics.categoryStock.map((item)=>item[0]))
      setCategoryStockData(analytics.categoryStock.map((item)=>item[1]))
      setCategorySoldData(analytics.categoryStock.map((item)=>item[2]))
    }
  }, [loading])
  


  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError)
    }
    dispatch(getAnalytics())
  }, [error,dispatch])
  
  return (
    <>{loading? <Loader/> :<>
      <div className='dashboardCardParent' >
        <div className="dashboardCard" style={{ background: `linear-gradient(to bottom right,${colors[3][0]} 0%,${colors[3][1]}) 100%` }}>
          <div className="dashboardCardHead">Products</div>
          <div className="dashboardCardBody">{analytics.numOfProducts}</div>
        </div>
        <div className="dashboardCard" style={{ background: `linear-gradient(to bottom right,${colors[2][0]} 0%,${colors[2][1]}) 100%` }}>
          <div className="dashboardCardHead">Stock</div>
          <div className="dashboardCardBody">{analytics.stock}</div>
        </div>
        <div className="dashboardCard" style={{ background: `linear-gradient(to bottom right,${colors[4][1]} 0%,${colors[4][0]}) 100%` }}>
          <div className="dashboardCardHead">Order</div>
          <div className="dashboardCardBody">{analytics.numOfOrder}</div>
        </div>
        <div className="dashboardCard" style={{ background: `linear-gradient(to bottom right,${colors[0][1]} 0%,${colors[0][0]}) 100%` }}>
          <div className="dashboardCardHead">Delivered</div>
          <div className="dashboardCardBody">{analytics.numOfDelivered}</div>
        </div>
        <div className="dashboardCard" style={{ background: `linear-gradient(to bottom right,${colors[1][1]} 0%,${colors[1][0]}) 100%` }}>
          <div className="dashboardCardHead">Users</div>
          <div className="dashboardCardBody">{analytics.numOfUser}</div>
        </div>
      </div>
      <div className="graphsCon">
        <div className="lineChart">
          <Line
            data={lineState}
            width={100}
            height={"25rem"}
            options={lineOptions}
          />
        </div>
        <div className="doughnutChart">
          <Doughnut
            data={stockState}
            width={100}
            height={"25rem"}
            options={stockOptions}
          />
        </div>
        <div className="doughnutChart">
          <Doughnut
            data={userState}
            width={100}
            height={"25rem"}
            options={userOptions}
          />
        </div>
        <div className="barChart">
          <Bar options={categoryOptions} width={100}
            height={'25rem'} data={categoryState} />
        </div>

      </div></>}
    </>
  )
}

export default Dashboard