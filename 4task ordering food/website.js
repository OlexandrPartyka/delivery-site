const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let deliveries = [
  { id: 1, name: 'Package 1', status: 'Pending', food: ['Burger', 'Pizza'] },
  { id: 2, name: 'Package 2', status: 'Delivered', food: ['Salad'] }
];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/deliveries', (req, res) => {
  res.json(deliveries);
});

app.post('/deliveries', (req, res) => {
  const { name, status, food } = req.body;
  if (!name || !status || (status !== 'Pending' && status !== 'Delivered')) {
    res.status(400).json({ error: 'Name and status (Pending/Delivered) are required' });
  } else {
    const newDelivery = { id: deliveries.length + 1, name, status, food };
    deliveries.push(newDelivery);
    res.redirect('/new-orders');
  }
});

app.get('/new-orders', (req, res) => {
  let ordersInfo = deliveries.map(order => {
    return `Person: ${order.name}\nOrder: ${order.food.join(', ')}\nStatus: ${order.status}\n\n`;
  });
  res.type('text').send(ordersInfo.join('\n'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});