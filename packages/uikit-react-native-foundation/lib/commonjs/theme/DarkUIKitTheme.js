"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createTheme = _interopRequireDefault(require("./createTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DarkUIKitTheme = (0, _createTheme.default)({
  colorScheme: 'dark',
  colors: palette => {
    return {
      primary: palette.primary200,
      secondary: palette.secondary200,
      error: palette.error200,
      background: palette.background600,
      text: palette.onBackgroundDark01,
      onBackground01: palette.onBackgroundDark01,
      onBackground02: palette.onBackgroundDark02,
      onBackground03: palette.onBackgroundDark03,
      onBackground04: palette.onBackgroundDark04,
      onBackgroundReverse01: palette.onBackgroundLight01,
      onBackgroundReverse02: palette.onBackgroundLight02,
      onBackgroundReverse03: palette.onBackgroundLight03,
      onBackgroundReverse04: palette.onBackgroundLight04,
      ui: {
        header: {
          nav: {
            none: {
              background: palette.background500,
              borderBottom: palette.onBackgroundDark04
            }
          }
        },
        button: {
          contained: {
            enabled: {
              background: palette.primary200,
              content: palette.onBackgroundLight01
            },
            pressed: {
              background: palette.primary300,
              content: palette.onBackgroundLight01
            },
            disabled: {
              background: palette.background500,
              content: palette.onBackgroundDark04
            }
          },
          text: {
            enabled: {
              background: palette.transparent,
              content: palette.primary200
            },
            pressed: {
              background: palette.background400,
              content: palette.primary200
            },
            disabled: {
              background: palette.transparent,
              content: palette.onBackgroundDark04
            }
          }
        },
        dialog: {
          default: {
            none: {
              background: palette.background500,
              text: palette.onBackgroundDark01,
              message: palette.onBackgroundDark02,
              highlight: palette.primary200,
              destructive: palette.error300,
              blurred: palette.onBackgroundDark04
            }
          }
        },
        input: {
          default: {
            active: {
              text: palette.onBackgroundDark01,
              placeholder: palette.onBackgroundDark03,
              background: palette.background400,
              highlight: palette.primary200
            },
            disabled: {
              text: palette.onBackgroundDark04,
              placeholder: palette.onBackgroundDark04,
              background: palette.background400,
              highlight: palette.onBackgroundDark04
            }
          },
          underline: {
            active: {
              text: palette.onBackgroundDark01,
              placeholder: palette.onBackgroundDark03,
              background: palette.transparent,
              highlight: palette.primary200
            },
            disabled: {
              text: palette.onBackgroundDark04,
              placeholder: palette.onBackgroundDark04,
              background: palette.transparent,
              highlight: palette.onBackgroundDark04
            }
          }
        },
        badge: {
          default: {
            none: {
              text: palette.background600,
              background: palette.primary200
            }
          }
        },
        placeholder: {
          default: {
            none: {
              content: palette.onBackgroundDark03,
              highlight: palette.primary200
            }
          }
        },
        dateSeparator: {
          default: {
            none: {
              text: palette.onBackgroundDark02,
              background: palette.overlay02
            }
          }
        },
        groupChannelMessage: {
          incoming: {
            enabled: {
              textMsg: palette.onBackgroundDark01,
              textEdited: palette.onBackgroundDark02,
              textTime: palette.onBackgroundDark03,
              textSenderName: palette.onBackgroundDark02,
              background: palette.background400,
              textVoicePlaytime: palette.onBackgroundDark01,
              voiceSpinner: palette.primary200,
              voiceProgressTrack: palette.background400,
              voiceActionIcon: palette.primary200,
              voiceActionIconBackground: palette.background700
            },
            pressed: {
              textMsg: palette.onBackgroundDark01,
              textEdited: palette.onBackgroundDark02,
              textTime: palette.onBackgroundDark03,
              textSenderName: palette.onBackgroundDark02,
              background: palette.primary500,
              textVoicePlaytime: palette.onBackgroundDark01,
              voiceSpinner: palette.primary200,
              voiceProgressTrack: palette.background400,
              voiceActionIcon: palette.primary200,
              voiceActionIconBackground: palette.background700
            }
          },
          outgoing: {
            enabled: {
              textMsg: palette.onBackgroundLight01,
              textEdited: palette.onBackgroundLight02,
              textTime: palette.onBackgroundDark03,
              textSenderName: palette.transparent,
              background: palette.primary200,
              textVoicePlaytime: palette.onBackgroundLight01,
              voiceSpinner: palette.primary300,
              voiceProgressTrack: palette.primary200,
              voiceActionIcon: palette.primary200,
              voiceActionIconBackground: palette.background700
            },
            pressed: {
              textMsg: palette.onBackgroundLight01,
              textEdited: palette.onBackgroundLight02,
              textTime: palette.onBackgroundDark03,
              textSenderName: palette.transparent,
              background: palette.primary300,
              textVoicePlaytime: palette.onBackgroundLight01,
              voiceSpinner: palette.primary300,
              voiceProgressTrack: palette.primary200,
              voiceActionIcon: palette.primary200,
              voiceActionIconBackground: palette.background700
            }
          }
        },
        groupChannelPreview: {
          default: {
            none: {
              textTitle: palette.onBackgroundDark01,
              textTitleCaption: palette.onBackgroundDark03,
              textBody: palette.onBackgroundDark03,
              bodyIcon: palette.onBackgroundDark02,
              memberCount: palette.onBackgroundDark02,
              background: palette.background600,
              coverBackground: palette.onBackgroundDark04,
              bodyIconBackground: palette.background500,
              separator: palette.onBackgroundDark04
            }
          }
        },
        profileCard: {
          default: {
            none: {
              textUsername: palette.onBackgroundDark01,
              textBodyLabel: palette.onBackgroundDark02,
              textBody: palette.onBackgroundDark01,
              background: palette.background500
            }
          }
        },
        reaction: {
          default: {
            enabled: {
              background: palette.transparent,
              highlight: palette.onBackgroundDark03
            },
            selected: {
              background: palette.primary500,
              highlight: palette.primary200
            }
          },
          rounded: {
            enabled: {
              background: palette.background400,
              highlight: palette.transparent
            },
            selected: {
              background: palette.primary500,
              highlight: palette.transparent
            }
          }
        },
        openChannelMessage: {
          default: {
            enabled: {
              background: palette.transparent,
              bubbleBackground: palette.background500,
              adminBackground: palette.background500,
              textMsg: palette.onBackgroundDark01,
              textMsgPostfix: palette.onBackgroundDark02,
              textSenderName: palette.onBackgroundDark02,
              textTime: palette.onBackgroundDark03,
              textOperator: palette.secondary200
            },
            pressed: {
              background: palette.background500,
              bubbleBackground: palette.background700,
              adminBackground: palette.background500,
              textMsg: palette.onBackgroundDark01,
              textMsgPostfix: palette.onBackgroundDark02,
              textSenderName: palette.onBackgroundDark02,
              textTime: palette.onBackgroundDark03,
              textOperator: palette.secondary200
            }
          }
        },
        openChannelPreview: {
          default: {
            none: {
              textTitle: palette.onBackgroundDark01,
              textParticipants: palette.onBackgroundDark02,
              frozenIcon: palette.primary200,
              participantsIcon: palette.onBackgroundDark02,
              background: palette.background600,
              coverBackground: palette.background300,
              separator: palette.onBackgroundDark04
            }
          }
        },
        voiceMessageInput: {
          default: {
            active: {
              textCancel: palette.primary200,
              textTime: palette.onBackgroundLight01,
              background: palette.background600,
              actionIcon: palette.onBackgroundDark01,
              actionIconBackground: palette.background500,
              sendIcon: palette.onBackgroundLight01,
              sendIconBackground: palette.primary200,
              progressTrack: palette.primary200,
              recording: palette.error300
            },
            inactive: {
              textCancel: palette.primary200,
              textTime: palette.onBackgroundDark03,
              background: palette.background600,
              actionIcon: palette.onBackgroundDark01,
              actionIconBackground: palette.background500,
              sendIcon: palette.onBackgroundDark04,
              sendIconBackground: palette.background500,
              progressTrack: palette.background400,
              recording: palette.error200
            }
          }
        }
      }
    };
  }
});
var _default = DarkUIKitTheme;
exports.default = _default;
//# sourceMappingURL=DarkUIKitTheme.js.map