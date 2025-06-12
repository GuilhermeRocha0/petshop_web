import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import api from '../services/api'

export default function ItemChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produtosRes, categoriasRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ])

        const produtos = produtosRes.data
        const categorias = categoriasRes.data

        const mapCategorias = {}
        categorias.forEach(cat => {
          mapCategorias[cat._id] = cat.name
        })

        const agrupado = {}
        produtos.forEach(p => {
          const categoriaId = typeof p.category === 'object' ? p.category._id : p.category
          const catName = mapCategorias[categoriaId] || 'Sem Categoria'
          if (!agrupado[catName]) agrupado[catName] = 0
          agrupado[catName] += p.quantity
        })

        const dataFormatada = Object.entries(agrupado).map(([name, quantidade]) => ({
          name,
          quantidade
        }))

        setData(dataFormatada)
      } catch (err) {
        console.error('Erro ao carregar dados do gráfico:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='chart-card'>
    <div style={{ width: '100%', height: 300 }}>
      <h3 style={{ textAlign: 'center' }}>Produtos disponíveis por categoria</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantidade" fill="#00c04b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  )
}
