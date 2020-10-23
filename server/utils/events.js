module.exports = {
  buildEnd: function () {
    console.log(' ');
    console.log(`Server running in ${process.env.NODE_ENV} mode on \x1b[32mlocalhost:${process.env.PORT}\x1b[0m`);
  },
  buildStart: function (entryPoints) {
    // cli whitespace
    console.log(' ');
    console.log(' ');

    // grabs endpoint of absolute path
    const endpoints = [];
    entryPoints.forEach(path => {
      endpoint = path.split('\\');

      endpoints.push(endpoint[endpoint.length - 1]);
    });

    if (endpoints.length) {
      console.log(`Available endpoints: \x1b[32m[ ${endpoints.join(', ')} ]\x1b[0m`);
    }

    // cli whitespace
    console.log(' ');
  }
};
