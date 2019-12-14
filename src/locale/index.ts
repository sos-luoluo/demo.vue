import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const lang: string = localStorage.getItem("lang") || "en-us";

const i18n = new VueI18n({
  locale: lang,
  messages: {}
});
export function loadLanguageAsync(lang: string) {
  import(`./langs/${lang}`).then(msg => {
    i18n.setLocaleMessage(lang, { ...msg.default });
    i18n.locale = lang;
    return lang;
  });
}

loadLanguageAsync(lang);

export default i18n;
