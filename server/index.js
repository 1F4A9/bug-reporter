const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Bundler = require('parcel-bundler');

const { buildStart, buildEnd } = require('./utils/events');

const app = express();

if (!process.env.PORT) {
  process.env.PORT = 5000;
}

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// parcel-bundler
const entryFiles = path.join(__dirname, '../client/*.html');
const options = { watch: true };
const bundler = new Bundler(entryFiles, options);

// mounts the router
const reportRoute = require('./routes/report');
app.use('/report', reportRoute);

// bundler middleware, mount last
app.use(bundler.middleware());

// bundler events
bundler.on('buildStart', (entryPoints) => buildStart(entryPoints));
bundler.on('buildEnd', () => buildEnd());

app.listen(process.env.PORT);