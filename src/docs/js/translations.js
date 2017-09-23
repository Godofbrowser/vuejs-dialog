// mini translator

const TRANSLATIONS = {
    en: require('./translations/en').default,
    zh: require('./translations/zh').default
    //es: require('./translations/es').default
}


const Translator = function (translations, separator = '.') {
    this.separator = separator
    this.translations = translations

    let navigatorLang = window.navigator.language || window.navigator.userLanguage
    let selectedLang = window.location.search.match(/(?:[\?\&])(?:lang=)(\w{2})(?:&|$)/)
    let lang = selectedLang ? selectedLang[1] : navigatorLang

    this.setLanguage(lang)
}

Translator.prototype.setLanguage = function (lang) {
    this.lang = typeof this.translations[lang] !== 'undefined' ? lang : 'en'
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

window.Translator = new Translator(TRANSLATIONS)

export default function (n) {
    return window.Translator.get(n)
}