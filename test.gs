function runTest(){
  let sheet = 'PG'
  updateSymData(sheet)
}

function updateSymData(sheet){
  let ss = SpreadsheetApp.getActive().getSheetByName(sheet)
  let sym = ss.getRange('B2').getValue()
  var token = SpreadsheetApp.getActive().getSheetByName('API').getRange('B2').getValue()
  var res = UrlFetchApp.fetch('https://finnhub.io/api/v1/quote?symbol=' + sym + '&token=' + token, {muteHttpExceptions: true})
  var obj = JSON.parse(res.getContentText())
  ss.getRange('B3').setValue(obj.c)
  ss.getRange('B4').setValue(obj.pc)
}