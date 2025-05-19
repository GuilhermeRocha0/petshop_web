import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ selectedProducts, cartTotal }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const newErrors = {};

  const validate = () => {

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
    const { name, value } = e.target;

    let newValue = value;

    // Máscaras manuais
    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      newValue = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }

    if (form.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "O número do cartão deve ter 16 dígitos";
    }

    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      newValue = digits.length >= 3 ? digits.replace(/(\d{2})(\d{1,2})/, "$1/$2") : digits;
    }

    if (name === "cvv") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setForm({ ...form, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="checkout-container">
      <h1>Finalizar Pagamento</h1>

      <div className="products-summary">
        <h2>Produtos Selecionados:</h2>
        {(selectedProducts?.length || 0) === 0 ?  (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {selectedProducts.map((product) => (
              <li key={product.id}>
                {product.name} - R$ {product.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: <span>R$ {(cartTotal || 0).toFixed(2)}</span></h3>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Nome no Cartão</label>
          <input
            type="text"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            placeholder="Nome impresso no cartão"
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
            placeholder="1234 5678 9012 3456"
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
              placeholder="123"
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
            placeholder="Rua, número, bairro, cidade"
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <button type="submit" className="pay-button">Confirmar Pagamento</button>
      </form>
    </div>
  );

}


