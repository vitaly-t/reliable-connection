'use strict';

// Automatic links:
const links = {
    'Promises/A+': 'https://promisesaplus.com'
};

function fixLinks(source) {
    return source.replace(/\$\[[a-z0-9\s/+-.]+\]/gi, name => {
        const sln = name.replace(/\$\[|\]/g, ''); // stripped link name;
        if (sln in links) {
            return '<a href="' + links[sln] + '">' + sln + '</a>';
        }
        return name;
    });
}

module.exports = fixLinks;
