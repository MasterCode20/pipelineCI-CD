const express = require('express');
const client = require('prom-client');

const app = express();

// Créez un registre Prometheus pour les métriques
const register = new client.Registry();

// Exemple de compteur
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  registers: [register],
});

// Compter chaque requête HTTP
app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

// Exposer les métriques sur /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
