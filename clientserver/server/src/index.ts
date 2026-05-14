import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT,
    quantity INTEGER,
    total_price REAL
  )`);
});

const prices: Record<string, number> = {
  "Ручка": 50,
  "Блокнот": 150,
  "Бумага": 300
};

// Запись заказа
app.post("/api/order", (req, res) => {
  const { itemName, quantity } = req.body;
  
  if (!prices[itemName] || !quantity) {
    return res.status(400).json({ error: "Неверные данные заказа" });
  }

  const totalPrice = prices[itemName] * quantity;

  db.run(
    `INSERT INTO orders (item_name, quantity, total_price) VALUES (?, ?, ?)`,
    [itemName, quantity, totalPrice],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ status: "success", total: totalPrice, orderId: this.lastID });
    }
  );
});

// Просмотр всех заказов
app.get("/api/orders", (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});