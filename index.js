var linksSelector = 'td.title > a'
function getCommentsLink(link) {
    return link.parentNode.parentNode.nextSibling.querySelector('a[href^="item?"]');
}

var links = document.querySelectorAll(linksSelector);

chrome.storage.local.get(null, function(cachedLinkPosition) {
    // if you were browsing HN less than 25 minutes ago, you probably don't want to lose your position
    // in the list of links. In the future I might cache the first letter of every link as the indicator
    // instead of a timestamp.
    if (cachedLinkPosition && (new Date().getTime())-cachedLinkPosition.timestamp < (1000*60*25)) {
        currentLinkIndex = cachedLinkPosition.position;
    } else {
        currentLinkIndex = 0;
    }

    links[currentLinkIndex].focus();
})

function saveCurrentLinkPosition(position) {
    chrome.storage.local.set({
        "timestamp": (new Date().getTime()),
        "position" : currentLinkIndex
    })
}

document.onkeypress = function (e) {
    e = e || window.event;

    var jKey = 106; // move up in link list
    var kKey = 107; // move down in link list

    var cKey = 99; // view comments


    //console.log(e.keyCode);


    if (e.keyCode === jKey && currentLinkIndex < links.length-1) {
        e.preventDefault();
        currentLinkIndex += 1;
        saveCurrentLinkPosition(currentLinkIndex);
        links[currentLinkIndex].focus();

    } else if (e.keyCode === kKey && currentLinkIndex > 0) {
        e.preventDefault();
        currentLinkIndex += -1;
        saveCurrentLinkPosition(currentLinkIndex);
        links[currentLinkIndex].focus()

    } else if (e.keyCode === cKey) {
        var commentLink = getCommentsLink(links[currentLinkIndex]);
        if (commentLink) {
            e.preventDefault();
            commentLink.click();
        }
    }

};
