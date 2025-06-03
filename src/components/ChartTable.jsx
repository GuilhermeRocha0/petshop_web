import React from 'react'
import ItemChart from './ItemChart'
import OrderChart from './OrderChart'
import './chartTable.css'
const ChartTable = () => {
  return (
    <div className="page-wrapper">
      <h1>Relatórios Visuais</h1>

      <div className="charts-grid">
        {<ItemChart/>}
        {<OrderChart/>}  
        {<ItemChart/>}
        {<ItemChart/>}        

        </div>
        </div>
  )
}

export default ChartTable
