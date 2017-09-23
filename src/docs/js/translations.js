// mini translator

import en from './translations/en'


const Translator = function (translations, separator = '.') {
    let lang = window.navigator.language || window.navigator.userLanguage
    this.lang = typeof translations[lang] !== 'undefined' ? lang : 'en'
    this.separator = separator
    this.translations = translations
}

Translator.prototype.get = function (route) {
    let parts = route.split(this.separator)
    let translation = this.translations[this.lang]

    for (let i = 0; i < parts.length; i++) {
        translation = translation[parts[i]]
        if (translation === undefined) {
            translation = '[Error: No Translation]'
            break
        }
    }

    return translation
}

let T = new Translator({en})

export default function (n) {
    return T.get(n)
}