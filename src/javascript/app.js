"use strict"

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales';

export default async () => {
  await i18next
    .use(LanguageDetector)
    .init({
      lng: 'ua',
      fallbackLng: 'ua',
      resources,
      debug: false
    })

  const btnToggleLanguage = document.getElementById("language-toggle");
  const buttonNavicon = document.querySelector('[data-navicon="button"]');
  const header = document.querySelector('#header-app');
  const navLinks = document.querySelectorAll('#header-app a');
  const offsetHeightHeader = header.offsetHeight;
  const offsetHeightIntro = document.querySelector('#main-app .intro').offsetHeight;
  const offset_val = offsetHeightIntro - offsetHeightHeader;

  /* Methods */
  const translate = (elem) => {
    const i18nextKey = elem.dataset.i18nKey;
    elem.textContent = i18next.t(i18nextKey);
  } 

  const startLocalization = () => document.querySelectorAll("[data-i18n-key]").forEach(translate);

  const handleToggleLanguage = (event) => {
    const currentLanguage = event.currentTarget.checked ? 'en' : 'ua';
    i18next.changeLanguage(currentLanguage, () => startLocalization())
  }
    

  const navSlide = () => {
    var scroll_top = window.scrollY;
    if (scroll_top >= offset_val) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  }

  const menuToggle = () => {
    if (header.classList.contains("is-open")) {
      console.log('+');
      header.classList.remove("is-open");
      buttonNavicon.classList.remove("is--closed");
    } else {
      header.classList.add("is-open");
      buttonNavicon.classList.add("is--closed");
    }
  }

  const  openNav = () => {
    if (header.classList.contains("is-open")) {
      header.classList.remove("is-open");
      buttonNavicon.classList.remove("is--closed");
    }
  }
  /* Handlers */
  btnToggleLanguage.addEventListener('input', handleToggleLanguage);
  buttonNavicon.addEventListener('click', menuToggle);
  navLinks.forEach(link => link.addEventListener('click', openNav));
  window.addEventListener('scroll', navSlide);
  window.addEventListener('DOMContentLoaded', () => startLocalization());
};
