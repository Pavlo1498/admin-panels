import { ref } from 'vue';
import { Dark } from 'quasar';

export const theme = ref(false);

export const checkTheme = () => {
  const localStorageTheme = localStorage.getItem('theme');

  if (localStorageTheme) {
    switch (localStorageTheme) {
      case 'light':
        Dark.set(false);
        break;
      case 'dark':
        Dark.set(true);
        break;
    }
  }

  toggleTheme(Dark.isActive);
};

export const toggleTheme = (val) => {
  const htmlElement = document.documentElement;
  Dark.set(val);

  if (val) {
    localStorage.setItem('theme', 'dark');
    theme.value = val;
    htmlElement.setAttribute('theme', 'dark');
  } else {
    theme.value = val;
    localStorage.setItem('theme', 'light');
    htmlElement.setAttribute('theme', 'light');
  }
};
