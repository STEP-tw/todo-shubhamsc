const getToString = function (data) {
  return JSON.stringify(data, null, 2);
};
exports.getToString = getToString;

const getTypes = function (extn) {
  let types = {
    html: 'text/html',
    jpg: 'image/jpg',
    gif: 'image/gif',
    pdf: 'application/pdf',
    css: 'text/css',
    js: 'text/javascript'
  };
  return types[extn];
};

exports.getTypes = getTypes;


const writeContents = function (req, res, data,type='text/html') {
  res.statusCode = 200;
  res.setHeader('Content-Type', type);
  res.write(data);
  res.end();
};

exports.writeContents = writeContents;
