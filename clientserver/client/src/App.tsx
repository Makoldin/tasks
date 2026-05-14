import { useState, useEffect } from "react";

// Описываем, как выглядит наш заказ для TypeScript
interface Order {
  id: number;
  item_name: string;
  quantity: number;
  total_price: number;
}

export default function App() {
  const [item, setItem] = useState("Ручка");
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState("");
  
  // Новое состояние для хранения списка заказов
  const [orders, setOrders] = useState<Order[]>([]);

  // Функция для получения всех заказов с сервера
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders");
      const data = await response.json();
      setOrders(data); // Сохраняем полученные данные в состояние
    } catch (error) {
      console.error("Ошибка при загрузке заказов", error);
    }
  };

  // Вызываем fetchOrders один раз при загрузке страницы
  useEffect(() => {
    fetchOrders();
  }, []);

  const sendOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: item, quantity }),
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        setResult(`Заказ №${data.orderId} успешно сохранен в базу! Итого к оплате: ${data.total} руб.`);
        // ОБНОВЛЯЕМ ТАБЛИЦУ СРАЗУ ПОСЛЕ УСПЕШНОГО ЗАКАЗА
        fetchOrders(); 
      } else {
        setResult("Произошла ошибка: " + data.error);
      }
    } catch (error) {
      setResult("Ошибка соединения с сервером.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Калькулятор Канцтоваров</h1>
      
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>Товар:</label>
        <select value={item} onChange={(e) => setItem(e.target.value)} style={{ padding: "0.5rem" }}>
          <option value="Ручка">Ручка (50 руб)</option>
          <option value="Блокнот">Блокнот (150 руб)</option>
          <option value="Бумага">Бумага (300 руб)</option>
        </select>
      </div>
      
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>Количество:</label>
        <input 
          type="number" 
          value={quantity} 
          min="1" 
          onChange={(e) => setQuantity(Number(e.target.value))} 
          style={{ padding: "0.5rem", width: "80px" }}
        />
      </div>
      
      <button 
        onClick={sendOrder} 
        style={{ padding: "0.5rem 1rem", background: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Рассчитать и сохранить
      </button>

      {result && (
        <div style={{ marginTop: "1rem", padding: "1rem", background: "#e8f5e9", borderRadius: "4px", color: "green" }}>
          <strong>{result}</strong>
        </div>
      )}

      {/* --- НОВЫЙ БЛОК С ТАБЛИЦЕЙ --- */}
      <hr style={{ margin: "2rem 0", border: "none", borderTop: "1px solid #ccc" }} />
      <h2>История заказов</h2>
      
      {orders.length === 0 ? (
        <p>Заказов пока нет.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>№</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Товар</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Кол-во</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.id}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.item_name}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.quantity}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.total_price} руб.</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}