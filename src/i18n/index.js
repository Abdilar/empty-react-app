import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import {initReactI18next} from 'react-i18next';
import {APP_DEFAULT_LANGUAGE} from 'config/variables.config';
import {getAppLanguage} from 'utils/functions.util';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lang: getAppLanguage(),
    fallbackLng: APP_DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: `./i18n/${getAppLanguage()}.json`,
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
