import { Platform } from 'react-native';
function shouldUseScrollViewEnhancer() {
  var _Platform$constants$r;
  if (((_Platform$constants$r = Platform.constants.reactNativeVersion) === null || _Platform$constants$r === void 0 ? void 0 : _Platform$constants$r.major) < 1) {
    var _Platform$constants$r2;
    if (((_Platform$constants$r2 = Platform.constants.reactNativeVersion) === null || _Platform$constants$r2 === void 0 ? void 0 : _Platform$constants$r2.minor) < 72) {
      return true;
    }
  }
  return false;
}
function getFlatList() {
  if (shouldUseScrollViewEnhancer()) {
    try {
      return require('@sendbird/react-native-scrollview-enhancer').FlatList;
    } catch {
      return require('react-native').FlatList;
    }
  } else {
    return require('react-native').FlatList;
  }
}
const FlatListInternal = getFlatList();
export default FlatListInternal;
//# sourceMappingURL=FlatListInternal.js.map