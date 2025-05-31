module.exports = {
  test: false,
  max: 0,
  version: 'v2.0.550',
  pagerender: (pageData) => {
    return pageData.getTextContent();
  }
}; 