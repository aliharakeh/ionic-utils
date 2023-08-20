# App Configuration
The config control of the app.

## Packages
- @capacitor/assets (app icon - https://github.com/ionic-team/capacitor-assets)
- @capacitor/splash-screen (splash screen)
- @trapezedev/configure (app settings - https://trapeze.dev/)
- inquirer (cli config options - https://www.npmjs.com/package/inquirer)
```
npm install @capacitor/splash-screen
npm install -D @capacitor/assets @trapezedev/configure inquirer
```

## Icon
Inside root `resources` folder, add a svg icon and configure `icon background color` in the configuration `yaml` file.

## Config
Inside the root `configuration` folder
- commands.js
- config.yaml
- sync.config.yaml

Inside `package.json`

```json5
{
  // ...
  "scripts": {
    "ng": "ng",
    "ionic": "ionic",
    "angular:serve": "ng serve",
    "angular:build": "ng build",
    "android:add": "ionic cap add android",
    "ios:add": "ionic cap add ios",
    "android:copy": "ionic cap copy android --no-build",
    "ios:copy": "ionic cap copy ios --no-build",
    "android:icons_and_splash": "npx capacitor-assets generate --iconBackgroundColor #18a0fb --iconBackgroundColorDark #18a0fb --splashBackgroundColor #18a0fb --splashBackgroundColorDark #18a0fb --logoSplashScale 0.8 --android",
    "ios:icons_and_splash": "npx capacitor-assets generate --iconBackgroundColor #18a0fb --iconBackgroundColorDark #18a0fb --splashBackgroundColor #18a0fb --splashBackgroundColorDark #18a0fb --logoSplashScale 0.8 --ios",
    "ionic:sync": "ionic cap sync --no-build",
    "version": "node -p \"require('./package').version\"",
    "sync:configure": "trapeze run -y configuration/sync.config.yaml",
    "app:configure": "trapeze run -y configuration/config.yaml",
    "app:commands": "node configuration/commands.js"
  }
  // ...
}
```