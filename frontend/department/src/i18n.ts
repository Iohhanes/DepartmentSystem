import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ru from './locales/ru.json';

i18n
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',
        resources: ru
    });