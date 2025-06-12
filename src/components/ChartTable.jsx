import React from 'react'
import ItemChart from './ItemChart'
import OrderChart from './OrderChart'
import AppointmentChart from './AppointmentChart'
import './chartTable.css'
const ChartTable = () => {
  return (
    <div className="page-wrapper">
      <h1>Relatórios Visuais</h1>

      <div className="charts-grid">
        {<ItemChart/>}
        {<OrderChart/>}  
        {<AppointmentChart/>}      

        </div>
        </div>
  )
}

export default ChartTable
