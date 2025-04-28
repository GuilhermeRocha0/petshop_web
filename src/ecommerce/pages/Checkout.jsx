import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({cartTotal}) {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  const [errors, setErrors] = useState({});



  const validate = () => {
    const newErrors = {};
    if (!form.cardName) newErrors.cardName = "Nome no cartão é obrigatório";
    if (!form.cardNumber) newErrors.cardNumber = "Número do cartão é obrigatório";
    if (!form.expiry) newErrors.expiry = "Validade é obrigatória";
    if (!form.cvv) newErrors.cvv = "CVV é obrigatório";
    if (!form.address) newErrors.address = "Endereço é obrigatório";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("✅ Pagamento efetuado com sucesso!");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="checkout-container">
      <h1>Finalizar Pagamento</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Nome no Cartão</label>
          <input
            type="text"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
          />
          {errors.cardName && <p className="error">{errors.cardName}</p>}
        </div>

        <div className="form-group">
          <label>Número do Cartão</label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            maxLength="16"
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
        </div>

        <div className="form-group flex-group">
          <div>
            <label>Validade (MM/AA)</label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/AA"
              maxLength="5"
            />
            {errors.expiry && <p className="error">{errors.expiry}</p>}
          </div>

          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              maxLength="3"
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Endereço de Entrega</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="total-to-pay">
  <h2>Total a Pagar: <span>R$ {cartTotal.toFixed(2)}</span></h2>
</div>


        <button type="submit" className="pay-button">Confirmar Pagamento</button>
      </form>
    </div>
  );
}
