const createNativeClipboardService = clipboardModule => {
  return {
    getString() {
      return clipboardModule.getString();
    },
    setString(text) {
      return clipboardModule.setString(text);
    }
  };
};
export default createNativeClipboardService;
//# sourceMappingURL=createClipboardService.native.js.map