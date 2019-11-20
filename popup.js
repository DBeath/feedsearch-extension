
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  console.log(`Color: ${color}`);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

let queryFeeds = document.getElementById('queryFeeds');

queryFeeds.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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