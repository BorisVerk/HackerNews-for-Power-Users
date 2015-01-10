var linksSelector = 'td.title > a'
function getCommentsLink(link) {
    return link.parentNode.parentNode.nextSibling.querySelector('a[href^="item?"]');
}


var links = document.querySelectorAll(linksSelector)
var currentLinkIndex = 0;

if (links.length) {
    links[0].focus();
    links[currentLinkIndex].focus();
}


document.onkeypress = function (e) {
    e = e || window.event;

    var jKey = 106; // move up in torrent list
    var kKey = 107; // move down in torrent list

    var cKey = 99; // view comments


    //console.log(e.keyCode);


    if (e.keyCode === jKey && currentLinkIndex < links.length-1) {
        e.preventDefault();
        currentLinkIndex += 1;
        links[currentLinkIndex].focus()

    } else if (e.keyCode === kKey && currentLinkIndex > 0) {
        e.preventDefault();
        currentLinkIndex += -1;
        links[currentLinkIndex].focus()

    } else if (e.keyCode === cKey) {
        var commentLink = getCommentsLink(links[currentLinkIndex]);
        if (commentLink) {
            e.preventDefault();
            commentLink.click();
        }
    }

};
