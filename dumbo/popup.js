function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  var code = 'var meta = document.querySelector("meta[property=\'hcp:version\']");' + 'if (meta) meta = meta.getAttribute("content");' +
           '({' +
           '    title: document.title,' +
           '    version: meta || ""' +
           '});';
  chrome.tabs.executeScript(
    {
      code: code
    }, 
    function(results) {
      if (!results) {
        // An error occurred at executing the script. You've probably not got
        // the permission to execute a content script for the current tab
        return;
      }
      var result = results[0];
      if (result.version) {
        renderStatus('HCP Version : ' + result.version);
      }
      else {
        renderStatus('Not HCP Site');
      }
    }
  );

});
