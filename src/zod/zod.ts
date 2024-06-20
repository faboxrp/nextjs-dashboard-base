import i18next from "i18next";
import esTranslation from "zod-i18n-map/locales/es/zod.json";
import enTranslation from "zod-i18n-map/locales/en/zod.json";
// import jaTranslation from "zod-i18n-map/locales/ja/zod.json";
import { makeZodI18nMap } from "zod-i18n-map";
import { z } from "zod";
import { getLocale } from "@/locales/dictionary";

const es = i18next.createInstance();
es.init({
  lng: "es",
  resources: {
    es: { zod: esTranslation },
  },
});

const en = i18next.createInstance();
en.init({
  lng: "en",
  resources: {
    en: { zod: enTranslation },
  },
});

// const ja = i18next.createInstance();
// ja.init({
//   lng: "ja",
//   resources: {
//     ja: { zod: jaTranslation },
//   },
// });

const zodMap = {
  en: makeZodI18nMap({ t: en.t }),
  es: makeZodI18nMap({ t: es.t }),
  // ja: makeZodI18nMap({ t: ja.t }),
};

// Set zod error map by user's locale.
// The error message should be translated based on user's locale.
z.setErrorMap((err, ctx) => zodMap[getLocale()](err, ctx));

export { z };
