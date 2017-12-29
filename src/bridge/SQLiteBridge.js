/**
 * Test functional
 * @param payload
 * @param webview
 * @param SQLite
 * @constructor
 */
let SQLiteBridge = function (payload, webview, SQLite) {
  let type = payload.type;
  switch (type) {
    case 'OPEN':
      eval(payload.operationDataBase);
      eval(payload.errorCB);

      SQLite.openDatabase(payload.name, payload.version, payload.displayName, payload.databaseSize)
        .then(operationDataBase.bind(this, webview))
        .catch(errorCB);
      break;
  }
};

export default SQLiteBridge;
