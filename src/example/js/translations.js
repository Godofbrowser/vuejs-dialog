// mini translator

import en from './translations/en'


const Translator = function(translations, separator = '.'){
    let lang = window.navigator.languages[1]
    this.lang = typeof translations[lang] !== 'undefined' ? lang : 'en'
    this.separator = '.'
    this.translations = translations
}

Translator.prototype.get = function (route) {
    let parts = route.split(this.separator)
    let translation = this.translations[this.lang]
    parts.forEach(key => {
        translation = translation[key]
        if (translation === undefined){
            translation = 'No Translation'
            return
        }
    })
    return translation

}

let T = new Translator({en})

export default function(n){
    return T.get(n)
}