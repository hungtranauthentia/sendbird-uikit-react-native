import React from 'react';
import { View } from 'react-native';
const MAX = 4;
const AvatarGroup = _ref => {
  let {
    children,
    containerStyle,
    size = 56
  } = _ref;
  const childAmount = React.Children.count(children);
  if (childAmount === 0) {
    return /*#__PURE__*/React.createElement(View, {
      style: [containerStyle, {
        overflow: 'hidden',
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: 'rgba(120,120,120,0.2)'
      }]
    });
  }
  const renderAvatars = () => {
    var _React$Children$map;
    return ((_React$Children$map = React.Children.map(children, (child, index) => {
      if (index + 1 > MAX) return child;
      if (! /*#__PURE__*/React.isValidElement(child)) return child;
      if (childAmount === 1) return /*#__PURE__*/React.cloneElement(child, {
        size,
        containerStyle
      });
      const top = getTopPoint(index, childAmount) * size;
      const left = getLeftPoint(index) * size;
      const width = getWidthPoint(index, childAmount) * size;
      const height = getHeightPoint(index, childAmount) * size;
      const innerLeft = -getInnerLeft(index, childAmount) * size;
      const innerTop = -getInnerTop(childAmount) * size;
      return /*#__PURE__*/React.createElement(View, {
        style: {
          overflow: 'hidden',
          position: 'absolute',
          top,
          left,
          width,
          height
        }
      }, /*#__PURE__*/React.cloneElement(child, {
        size,
        square: true,
        containerStyle: {
          left: innerLeft,
          top: innerTop
        }
      }));
    })) === null || _React$Children$map === void 0 ? void 0 : _React$Children$map.slice(0, 4)) ?? [];
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [containerStyle, {
      overflow: 'hidden',
      width: size,
      height: size,
      borderRadius: size
    }]
  }, renderAvatars());
};
const getHeightPoint = (_, total) => {
  if (total === 2) return 1;
  return 0.5;
};
const getWidthPoint = (idx, total) => {
  if (total === 3 && idx === 0) return 1;
  return 0.5;
};
const getTopPoint = (idx, total) => {
  if (total === 2) return 0;
  if (total === 3 && idx === 0) return -0.025;
  if (total === 3 && idx !== 0) return 0.525;
  if (idx === 0 || idx === 1) return -0.025;
  return 0.525;
};
const getLeftPoint = idx => {
  if (idx === 0 || idx === 2) return -0.025;
  return 0.525;
};
const getInnerLeft = (idx, total) => {
  if (total === 3 && idx === 0) return 0;
  return 0.25;
};
const getInnerTop = total => {
  if (total === 2) return 0;
  return 0.25;
};
export default AvatarGroup;
//# sourceMappingURL=AvatarGroup.js.map