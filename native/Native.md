# Back Button Control
check: https://ionicframework.com/docs/developing/hardware-back-button

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