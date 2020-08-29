var doGet = (request) => {
  return HtmlService.createTemplateFromFile('html').evaluate();
}

var include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function updateData(){
  SpreadsheetApp.getActive().getSheetByName('Companies').getRange('C2:D').clear()
  var rowCount = getRowCount()
  for (var row = 2; row < rowCount + 2; row++){
    getPrice(row)
  }
  return setLastUpdated()
}

function getRowCount(){
  var ss = SpreadsheetApp.getActive().getSheetByName('Companies')
  var vals = ss.getRange('B2:B').getValues()
  var count = vals.filter(function(a){
    return a != ''
  }).length
  return count
}

function getPrice(row){
  var ss = SpreadsheetApp.getActive()
  var sym = ss.getSheetByName('Companies').getRange('B' + row).getValue()
  var token = ss.getSheetByName('API').getRange('B2').getValue()
  var res = UrlFetchApp.fetch('https://finnhub.io/api/v1/quote?symbol=' + sym + '&token=' + token, {muteHttpExceptions: true})
  var obj = JSON.parse(res.getContentText())
  ss.getSheetByName('Companies').getRange('C' + row).setValue(obj.c)
  ss.getSheetByName('Companies').getRange('D' + row).setValue(obj.pc)
}

function setLastUpdated(){
  var ss = SpreadsheetApp.getActive()
  ss.getSheetByName('Companies').getRange('N1').setValue(new Date())
}