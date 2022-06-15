/*
By Matt05 Developer
https://matt05.ml
04.12.2021
*/

window.MathJax = {
  options: {
    enableMenu: false,          // set to false to disable the menu
  },
  startup: {
    pageReady: () => {
      console.log('Running MathJax');
      return MathJax.startup.defaultPageReady();
    }
  },
};
