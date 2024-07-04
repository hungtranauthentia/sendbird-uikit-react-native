const createExpoClipboardService = clipboardModule => {
  return {
    getString() {
      return clipboardModule.getStringAsync();
    },
    setString(text) {
      return clipboardModule.setString(text);
    }
  };
};
export default createExpoClipboardService;
//# sourceMappingURL=createClipboardService.expo.js.map