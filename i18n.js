const langMap = {}

var userLanguage = navigator.language.substring(0, 2);
// if search param contains `lang`
if (location.search &&
    location.search.substring(1).split('&').find(item => item.split('=')[0] === 'lang') &&
    location.search.substring(1).split('&').find(item => item.split('=')[0] === 'lang')[1]
) {
    userLanguage = location.search.substring(1).split('&').find(item => item.split('=')[0] === 'lang').split('=')[1]
} else {
    location.replace(location.origin + location.pathname + (location.search ? location.search + '&' : '?') + 'lang=' + userLanguage)
}

fetch('i18n/' + userLanguage + '.json')
    .then(response => response.json())
    .then(data => langMap[userLanguage] = data)


function applyLocalization() {
    const data = langMap[userLanguage]
    // 遍历页面中所有带有 title 或 data-i18n 属性的元素
    var elements = document.querySelectorAll('[title],[data-i18n]');
    elements.forEach(element => {
        if (element.hasAttribute('data-i18n')) {
            var key = element.getAttribute('data-i18n');
            if (data[key]) {
                if (element.hasAttribute('title')) {
                    element.setAttribute('title', data[key]);
                } else {
                    element.textContent = data[key];
                }
            }
        }
    });
}

function t(key) {
    return langMap[userLanguage][key] ?? key
}
function trans(key) {
    return langMap[userLanguage][key] ?? key
}