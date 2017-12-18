
  var ConsoleBridge = function(payload) {
    let type = payload.type;

    switch (type) {
      // assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
      case 'assert':
        if (typeof console.assert === 'function') {
          console.assert(payload.test, payload.message);
        }
        break;
      // clear(): void;
      case 'clear':
        if (typeof console.clear === 'function') {
          console.clear();
        }
        break;
      // count(countTitle?: string): void;
      case 'count':
        if (typeof console.count === 'function') {
          console.count(payload.countTitle);
        }
        break;
      // debug(message?: any, ...optionalParams: any[]): void;
      case 'debug':
        if (typeof console.debug === 'function') {
          console.debug(payload.message);
        }
        break;
      // dir(value?: any, ...optionalParams: any[]): void;
      case 'dir':
        if (typeof console.dir === 'function') {
          console.dir(payload.value);
        }
        break;
      // dirxml(value: any): void;
      case 'dirxml':
        if (typeof console.dirxml === 'function') {
          console.dirxml(payload.value);
        }
        break;
      // error(message?: any, ...optionalParams: any[]): void;
      case 'error':
        if (typeof console.error === 'function') {
          console.error(payload.message);
        }
        break;
      // exception(message?: string, ...optionalParams: any[]): void;
      case 'exception':
        if (typeof console.exception === 'function') {
          console.exception(payload.message);
        }
        break;
      // group(groupTitle?: string, ...optionalParams: any[]): void;
      case 'group':
        if (typeof console.group === 'function') {
          console.group(payload.groupTitle);
        }
        break;
      // groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void;
      case 'groupCollapsed':
        if (typeof console.groupCollapsed === 'function') {
          console.groupCollapsed(payload.groupTitle);
        }
        break;
      // groupEnd(): void;
      case 'groupEnd':
        if (typeof console.groupEnd === 'function') {
          console.groupEnd();
        }
        break;
      // info(message?: any, ...optionalParams: any[]): void;
      case 'info':
        if (typeof console.info === 'function') {
          console.info(payload.message);
        }
        break;
      // log(message?: any, ...optionalParams: any[]): void;
      case 'log':
        if (typeof console.log === 'function') {
          console.log(payload.message);
        }
        break;
      // msIsIndependentlyComposed(element: Element): boolean;
      case 'msIsIndependentlyComposed':
        if (typeof console.msIsIndependentlyComposed === 'function') {
          console.msIsIndependentlyComposed(payload.element);
        }
        break;
      // profile(reportName?: string): void;
      case 'profile':
        if (typeof console.profile === 'function') {
          console.profile(payload.reportName);
        }
        break;
      // profileEnd(): void;
      case 'profileEnd':
        if (typeof console.profileEnd === 'function') {
          console.profileEnd();
        }
        break;
      // select(element: Element): void;
      case 'select':
        if (typeof console.select === 'function') {
          console.select(payload.element);
        }
        break;
      // table(...data: any[]): void;
      case 'table':
        if (typeof console.table === 'function') {
          console.table(payload.data);
        }
        break;
      // time(timerName?: string): void;
      case 'time':
        if (typeof console.time === 'function') {
          console.time(payload.timerName);
        }
        break;
      // timeEnd(timerName?: string): void;
      case 'timeEnd':
        if (typeof console.timeEnd === 'function') {
          console.timeEnd(payload.timerName);
        }
        break;
      // trace(message?: any, ...optionalParams: any[]): void;
      case 'trace':
        if (typeof console.trace === 'function') {
          console.trace(payload.message);
        }
        break;
      // warn(message?: any, ...optionalParams: any[]): void;
      case 'warn':
        if (typeof console.warn === 'function') {
          console.warn(payload.message);
        }
        break;
    }
  };

  export default  ConsoleBridge;
