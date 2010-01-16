image1 = new Image();
image1.src = "indicator.gif";

function SetUp () {
  //smallwindow();
}

/*
function escapeQuote(target) {
  var result = target.replace(/\"/g, "\\\"");
  return result;
}


function convertCharSetAndEncode(target) {
  var escapedText = escapeQuote(target);
  var convertCmd = "/bin/echo \"" + escapedText + "\" | " +
                   "/usr/bin/iconv -f windows-1251 -t UTF-8";
  convertCmd = "/bin/echo \"" + escapedText + "\" > /tmp/test.1";
  var result = widget.system(convertCmd, null).outputString;
  // var output = widget.system("/usr/bin/id -un", null).outputString;
  return result;
}

function curl(url) 
{
  var curlCmd = "/usr/bin/curl \"" + url + "\" | " +
                "/usr/bin/iconv -f windows-1251 -t UTF-8";
  var result = widget.system(curlCmd, null).outputString;
  if (null == result ) result =  widget.system(curlCmd, null).errorString;
  return result;
}
*/

// dobavka ot Stratsimir:
function utf8_to_cp1251(string)
{
    var result = '';
    var tmp = 0;
    for (var i = 0; i < string.length; i++) {
	tmp = string.charCodeAt(i);

	if ((tmp >= 1072 && tmp <= 1103) || (tmp >= 1040 && tmp <= 1071)) tmp -= 848;

	result = result.concat('%', tmp.toString(16).toUpperCase());
    }
    return result;
}

/*
function cp1251_to_utf8(string)
{
    var result = '';
    var tmp = 0;
    for (var i = 0; i < string.length; i++) {
	tmp = string.charCodeAt(i);

	if ((tmp >= 224 && tmp <= 255) || (tmp >= 192 && tmp <= 223)) tmp += 848;

	result = result.concat(tmp);
    }
    return result;
}
*/

function AJAXstateChange(event, xmlRequest)
{
    if (null == xmlRequest.readyState) return;
    if (xmlRequest.readyState == 4) {
	 if (!xmlRequest.responseText) {
	     document.getElementById("Words").innerHTML = 'error occured';
	 } else {
	     document.getElementById("Words").innerHTML = xmlRequest.responseText;
	 }
    }
}

function searchSAD()
{
  var keywordValue = document.getElementById("Searchbox").value;
  if(keywordValue.length > 0) {
    largeWindow();
    var escapedText = utf8_to_cp1251(keywordValue);
    
    var reqUrl = "http://sa.dir.bg/cgi/sabig.cgi?word=" + escapedText + "&translate=Translate&encin=windows-1251&encout=windows-1251";

    document.getElementById("Words").innerHTML = "Searching for <b>'" + keywordValue + "'</b>:";
    var xmlRequest = new XMLHttpRequest();

    xmlRequest.onload = function(e) { AJAXstateChange(e, xmlRequest) }
    xmlRequest.onerror = function() { document.getElementById("Words").innerHTML = "request failed" }
    xmlRequest.open("GET", reqUrl);
    xmlRequest.send(null);
  } else {
    smallWindow();
  }
}

function showStatusMessage(Message)
{
  var Output = "";
  if(Message != "") {
    var Output = "<img name='image1' src='indicator.gif'>";
  }
  return Output;
}

function smallWindow()
{
  document.body.style.backgroundImage='url(Default.png)';
  document.getElementById("Words").className = 'inactive';
  window.resizeTo(350, 60);
}
function largeWindow()
{
  document.body.style.backgroundImage='url(Large.png)';
  document.getElementById("Words").className = 'active';
  window.resizeTo(350, 400);
}
