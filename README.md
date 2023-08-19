# Storage
The app storage.

## Packages
- @ionic/storage-angular (https://github.com/ionic-team/ionic-storage)
- localforage-cordovasqlitedriver (sqlite)
```
npm install @ionic/storage-angular localforage-cordovasqlitedriver
```

## Services
- StorageService

## Config
Inside `app.module.ts`

```ts
function initializeApp(storage: StorageService) {
    return (): Promise<any> => lastValueFrom(storage.init());
}

@NgModule({
    // ...
    imports: [
        // ...
        IonicStorageModule.forRoot({
            name: 'db',
            driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
        })
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [StorageService],
            multi: true
        }
    ]
    // ...
})
export class AppModule {}
```

# App Configuration
The config control of the app.

## Packages
- @capacitor/assets (app icon - https://github.com/ionic-team/capacitor-assets)
- @trapezedev/configure (app settings - https://trapeze.dev/)
- inquirer (cli config options - https://www.npmjs.com/package/inquirer)
```
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


# Back Button Control
Inside `app.component.ts`

```ts
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {App} from '@capacitor/app';
import {NavController, Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private backButtonSub: Subscription | null = null;

    constructor(
        private platform: Platform,
        private router: Router,
        private navCtrl: NavController
    ) {}
    
    ngOnInit() {
        this.observeBackButtonEvent();
    }

    ngOnDestroy() {
        if (this.backButtonSub) {
            this.backButtonSub.unsubscribe();
        }
    }
    
    observeBackButtonEvent() {
        if (this.platform.is('android') || this.platform.is('ios')) {
            this.backButtonSub = this.platform.backButton.subscribeWithPriority(0, () => {
                const exitRoutes: any[] = ['home'];
                const currentRoute = this.router.url;
                if (exitRoutes.some(route => currentRoute.startsWith(route))) {
                    App.exitApp();
                }
                else {
                    this.navCtrl.pop();
                }
            });
        }
    }
}
```

# Deep Links
Inside `app.component.ts`

```ts
import {App, URLOpenListenerEvent} from '@capacitor/app';

App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
    // run in NgZone angular service
    this.zone.run(() => {
        const { url } = event;
        // do stuff with the deep link url
    });
});
```

## Config
Inside app configuration `yaml` file.