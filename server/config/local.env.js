'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:3007',
  SESSION_SECRET: 'app-secret',
  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  QVERIFY_MYSQL_HOST: '192.168.1.200',
  QVERIFY_MYSQL_USER: 'gloryque',
  QVERIFY_MYSQL_PASS: 'intranet@quezx',
  QVERIFY_MYSQL_DB: 'qverify',

  MINIO_BUCKET: "qverify",
  MINIO_ENDPOINT: '192.168.1.200',
  MINIO_ACCESS_KEY: 'SN8JBGY43WPMFT0R56LG',
  MINIO_SECRET_KEY: 'VkNiKgyMxXGUd7qQdMTs+3R9e/x4V0F6XpjtYFHt'

  //MINIO_ENDPOINT: 'localhost',
  //MINIO_ACCESS_KEY: ' 6JA8ZB2T19TQ1XD5BO91',
  //MINIO_SECRET_KEY: 'Y7yPxmeifZTnSMM2yg3BaLqgDiKs/vTUXX3OWUm7'

};
//# sourceMappingURL=local.env.js.map
