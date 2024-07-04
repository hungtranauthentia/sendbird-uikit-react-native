import { NativeModules } from 'react-native';
function getImageModule() {
  const hasFastImage = Boolean(NativeModules.FastImageView);
  if (hasFastImage) {
    try {
      return require('./Image.fastimage').default;
    } catch (e) {
      return require('./Image.reactnative').default;
    }
  } else {
    return require('./Image.reactnative').default;
  }
}
const Image = getImageModule();
export default Image;
//# sourceMappingURL=index.js.map