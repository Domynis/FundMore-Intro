const express = require('express')
const app = express()
const bookRoutes = require('./BookRoutes')
const port = 3000

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: {
            message: message,
            status: status
        }
    });
};

app.use(requestLogger);

app.use(express.json());
app.use('/books', bookRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});