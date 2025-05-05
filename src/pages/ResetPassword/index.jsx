import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'

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
    if (/^\d$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handlePaste = e => {
    const paste = e.clipboardData.getData('text')
    if (/^\d{6}$/.test(paste)) {
      setCode(paste.split(''))
    }
  }

  return (
    <div>
      <h2>Redefinir Senha</h2>

      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <label>Informe seu e-mail</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />
          <button type="submit">Enviar Código</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <label>Informe o código</label>
          <div onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={e => handleCodeChange(e.target.value, index)}
                required
              />
            ))}
          </div>
          <button type="submit">Verificar Código</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <label>Nova Senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Nova senha"
            required
          />
          <label>Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirme a nova senha"
            required
          />
          <button type="submit">Redefinir Senha</button>
        </form>
      )}
    </div>
  )
}

export default ResetPassword
