import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import './reset-password.css'
import ItemChart from '../../components/ItemChart'
const ResetPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSendCode = async e => {
    e.preventDefault()
    try {
      await api.post('/auth/forgot-password', { email })
      toast.success('Código enviado para seu e-mail!')
      setStep(2)
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao enviar código.')
    }
  }

  const handleVerifyCode = async e => {
    e.preventDefault()
    const codeString = code.join('')
    try {
      await api.post('/auth/verify-code', { email, code: codeString })
      toast.success('Código verificado com sucesso!')
      setStep(3)
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao verificar código.')
    }
  }

  const handleResetPassword = async e => {
    e.preventDefault()
    const codeString = code.join('')
    try {
      await api.post('/auth/reset-password', {
        email,
        code: codeString,
        newPassword,
        confirmPassword
      })
      toast.success('Senha redefinida com sucesso!')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao redefinir senha.')
    }
  }

  const handleCodeChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus()
      }
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus()
    }
  }

  const handlePaste = e => {
    const paste = e.clipboardData.getData('text')
    if (/^\d{6}$/.test(paste)) {
      const newCode = paste.split('')
      setCode(newCode)
      setTimeout(() => {
        const lastInput = document.getElementById(`code-5`)
        lastInput?.focus()
      }, 0)
    }
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Redefinir Senha</h2>

        {step === 1 && (
          <form className="reset-password-form" onSubmit={handleSendCode}>
            <label>Email</label>
            <input
              type="email"
              className="reset-password-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
            <button type="submit" className="reset-password-button">
              Enviar Código
            </button>
            <button
              type="button"
              className="reset-password-cancel"
              onClick={() => navigate('/login')}
            >
              Cancelar
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="reset-password-form" onSubmit={handleVerifyCode}>
            <label>Código</label>
            <div className="reset-password-code" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={e => handleCodeChange(e.target.value, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  required
                  className="reset-password-code-input"
                />
              ))}
            </div>
            <button type="submit" className="reset-password-button">
              Verificar Código
            </button>
            <button
              type="button"
              className="reset-password-cancel"
              onClick={() => navigate('/login')}
            >
              Cancelar
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="reset-password-form" onSubmit={handleResetPassword}>
            <label>Nova Senha</label>
            <input
              type="password"
              className="reset-password-input"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Nova senha"
              required
            />
            <label>Confirmar Nova Senha</label>
            <input
              type="password"
              className="reset-password-input"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirme a nova senha"
              required
            />
            <button type="submit" className="reset-password-button">
              Redefinir Senha
            </button>
            <button
              type="button"
              className="reset-password-cancel"
              onClick={() => navigate('/login')}
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
