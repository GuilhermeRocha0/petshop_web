import React from "react";

export default function Checkout({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    alert("Pagamento realizado com sucesso!");
  };

  return (
    <div className="checkout-page">
      <h2>Resumo do Pedido</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} = R${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total: R${total.toFixed(2)}</h3>
      <button onClick={handlePayment}>Pagar</button>
    </div>
  );
}
