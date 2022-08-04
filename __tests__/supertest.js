const request = require('supertest');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const server = 'http://localhost:5000';


it('should serve the index.html file', () => {
return request(server)
.get('/')
.then((response) => {
  assert.ok(
    response.text ===
      fs.readFileSync(
        path.resolve(__dirname, './../src/index.html'),
        'utf8'
      )
  );
});
});

