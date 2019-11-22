window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

console.log('Feedsearch script started');

browser.runtime.onInstalled.addListener(function() {
  browser.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });

  // browser.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   browser.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'davidbeath.com'},
  //     })
  //     ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});

let queryFeeds = document.getElementById('queryFeeds');

queryFeeds.onclick = function(element) {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = tabs[0].url;
    console.log(`Fetching URL ${url}`);
    fetch(`https://feedsearch.dev/api/v1/search?url=${url}`)
      .then(response => response.text())
      .then(text => JSON.parse(text))
      .then(json => console.log(json))
      .catch(error => console.log(error))
    return true;
  });
}