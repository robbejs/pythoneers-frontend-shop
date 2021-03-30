import { createI18n } from "vue-i18n";

const messages = {
  en: {
    test: "test en",
  },
  nl: {
    test: "test nl",
  },
};

export default createI18n({
  locale: "en",
  legacy: false,
  messages,
});
