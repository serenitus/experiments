'use strict';

let fs = require('fs'),
    p = require('purdy');

let trie = {};

function buildTrie(callback) {
    fs.readFile('words.txt', 'utf8', (error, data) => {
        if (error) return callback(error);

        let words = data.split('\n');

        for (let word of words) {
            let subRoot = trie;
            word = word.toLowerCase();

            // Skip any trailing newline
            if (!word.trim()) continue;

            for (let i = 0; i < word.length; i++) {
                let letter = word[i];

                subRoot[letter] = subRoot[letter] || {};
                subRoot = subRoot[letter];
            }
            subRoot.$ = true;
        }

        return callback(null);
    });
}

function searchTrie(searchString) {
    let subRoot = trie;
    for (let letter of searchString) {
        if (typeof subRoot[letter] === 'object') {
            subRoot = subRoot[letter];
        } else {
            return false;
        }
    }
    return !!subRoot.$;
}

buildTrie(function (error) {
    if (error) {
        p(error);
    } else {
        p(searchTrie('a'));
        p(searchTrie('aa'));
        p(searchTrie('aaa'));
        p(searchTrie('banana'));
        p(searchTrie('bandana'));
        p(searchTrie('crevice'));
    }
});
