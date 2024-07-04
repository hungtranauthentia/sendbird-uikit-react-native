import createSelectByColorScheme from '../styles/createSelectByColorScheme';
import createTypography from '../styles/createTypography';
import Palette from './Palette';
const createTheme = _ref => {
  let {
    colorScheme,
    palette = Palette,
    colors: createColors,
    typography = {
      shared: {
        fontFamily: 'System'
      }
    }
  } = _ref;
  let _palette = palette;
  let _colors = createColors(_palette);
  return {
    colorScheme,
    select: createSelectByColorScheme(colorScheme),
    get palette() {
      return _palette;
    },
    set palette(value) {
      _palette = value;
      _colors = createColors(_palette);
    },
    get colors() {
      return _colors;
    },
    set colors(value) {
      _colors = value;
    },
    typography: createTypography(typography)
  };
};
export default createTheme;
//# sourceMappingURL=createTheme.js.map