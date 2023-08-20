# Tailwind
Add tailwind to the project. 
https://tailwindcss.com/docs/guides/angular

## Packages
- tailwindcss
- postcss
- autoprefixer
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

## Config
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,ts}'
    ],
    theme: {
        extend: {}
    },
    plugins: []
};
```

Inside `global.scss`

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```