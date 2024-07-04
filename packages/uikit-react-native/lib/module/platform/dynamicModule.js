/* eslint-disable no-console */

import { NativeModules, UIManager } from 'react-native';
import { Logger } from '@sendbird/uikit-utils';
function checkLink(dmi, logLevel) {
  const nativeModule = (() => {
    if (dmi.isComponent) {
      return UIManager.getViewManagerConfig(dmi.nativeModuleNamespace);
    } else {
      return NativeModules[dmi.nativeModuleNamespace];
    }
  })();
  if (!nativeModule) {
    const message = `[UIKit] Cannot use native module, you should install and link ${dmi.packageName} (${dmi.url})`;
    if (logLevel === 'error') console.error(message);
    if (logLevel === 'warn') console.warn(message);
  }
}
const SBUDynamicModuleRegistry = {
  '@react-native-community/netinfo': {
    packageName: '@react-native-community/netinfo',
    nativeModuleNamespace: 'RNCNetInfo',
    url: 'https://github.com/react-native-netinfo/react-native-netinfo',
    getPackage(logLevel) {
      checkLink(this, logLevel);
      try {
        return require('@react-native-community/netinfo');
      } catch (e) {
        return null;
      }
    }
  }
};
const SBUDynamicModule = {
  register(mdi) {
    SBUDynamicModuleRegistry[mdi.nativeModuleNamespace] = mdi;
  },
  getInfo(name) {
    return SBUDynamicModuleRegistry[name] ?? null;
  },
  get(name) {
    let logLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
    const dmi = this.getInfo(name);
    if (!dmi) Logger.warn(`${name} doesn't exist in the dynamic module`);
    return dmi === null || dmi === void 0 ? void 0 : dmi.getPackage(logLevel);
  }
};
export default SBUDynamicModule;
//# sourceMappingURL=dynamicModule.js.map