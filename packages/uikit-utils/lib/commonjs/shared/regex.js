"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlRegexStrict = exports.urlRegexRough = exports.replaceWithRegex = exports.replaceUrlAsComponents = exports.phoneRegex = exports.newLineRegex = exports.emailRegex = exports.createMentionTemplateRegex = void 0;
// For iOS 12 backwards compatibility
require('string.prototype.matchall').shim();
const urlRegexStrict = /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_+[\],.~#?&/=]*[-a-zA-Z0-9@:%_+\]~#?&/=])*/g;
exports.urlRegexStrict = urlRegexStrict;
const urlRegexRough = /(https?:\/\/|www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
exports.urlRegexRough = urlRegexRough;
const phoneRegex = /[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}/;
exports.phoneRegex = phoneRegex;
const emailRegex = /\S+@\S+\.\S+/;
exports.emailRegex = emailRegex;
const newLineRegex = /\r\n|\r|\n/g;
exports.newLineRegex = newLineRegex;
const createMentionTemplateRegex = trigger => new RegExp(`(${trigger}[{])(.*?)([}])`, 'g');

// const cases = [
//   {
//     type: 'urlStrict',
//     regex: urlRegexStrict,
//   },
//   {
//     type: 'urlRough',
//     regex: urlRegexStrict,
//   },
//   {
//     type: 'email',
//     regex: emailRegex,
//   },
//   {
//     type: 'phone',
//     regex: urlRegexStrict,
//   },
// ];
exports.createMentionTemplateRegex = createMentionTemplateRegex;
const replaceWithRegex = (text, regex, replacer, keyPrefix) => {
  const matches = [...text.matchAll(regex)];
  const founds = matches.map(value => {
    const text = value[0];
    const start = value.index ?? 0;
    const end = start + text.length;
    return {
      text,
      start,
      end,
      groups: value,
      matchIndex: value.index
    };
  });
  const items = [text];
  let cursor = 0;
  founds.forEach((_ref, index) => {
    let {
      text,
      start,
      end,
      groups,
      matchIndex
    } = _ref;
    const restText = items.pop();
    const head = restText.slice(0, start - cursor);
    const mid = replacer({
      match: text,
      groups,
      matchIndex,
      index,
      keyPrefix
    });
    const tail = restText.slice(end - cursor);
    items.push(head, mid, tail);
    cursor = end;
  });
  return items;
};
exports.replaceWithRegex = replaceWithRegex;
const replaceUrlAsComponents = (originText, replacer, strict) => {
  const matches = [...originText.matchAll(strict ? urlRegexStrict : urlRegexRough)];
  const founds = matches.map(value => {
    const text = value[0];
    const start = value.index ?? 0;
    const end = start + text.length;
    return {
      text,
      start,
      end
    };
  });
  const items = [originText];
  let cursor = 0;
  founds.forEach(_ref2 => {
    let {
      text,
      start,
      end
    } = _ref2;
    const restText = items.pop();
    const head = restText.slice(0, start - cursor);
    const mid = replacer(text);
    const tail = restText.slice(end - cursor);
    items.push(head, mid, tail);
    cursor = end;
  });
  return items;
};
exports.replaceUrlAsComponents = replaceUrlAsComponents;
//# sourceMappingURL=regex.js.map