var doGet = (request) => {
  return HtmlService.createTemplateFromFile('html').evaluate();
}

var include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function updateData(){
  var rowCount = getRowCount()
  for (var row = 6; row < rowCount + 6; row++){
    getPrice(row)
  }
  return setLastUpdated()
}

function getRowCount(){
  var ss = SpreadsheetApp.getActive().getSheetByName('Data')
  var vals = ss.getRange('C6:C').getValues()
  var count = vals.filter(function(a){
    return a != ''
  }).length
  return count
}

function getPrice(row){
  var ss = SpreadsheetApp.getActive()
  var sym = ss.getSheetByName('Data').getRange('C' + row).getValue()
  var token = ss.getSheetByName('API').getRange('B2').getValue()
  var res = UrlFetchApp.fetch('https://finnhub.io/api/v1/quote?symbol=' + sym + '&token=' + token, {muteHttpExceptions: true})
  var obj = JSON.parse(res.getContentText())
  ss.getSheetByName('Data').getRange('F' + row).setValue(obj.c)
}

function setLastUpdated(){
  var ss = SpreadsheetApp.getActive()
  ss.getSheetByName('Data').getRange('F1').setValue(new Date())
}