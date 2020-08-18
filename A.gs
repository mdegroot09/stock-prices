var doGet = (request) => {
  return HtmlService.createTemplateFromFile('html').evaluate();
}

var include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}