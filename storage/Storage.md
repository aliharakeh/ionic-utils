# Key-Value Storage
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

# Sqlite
Sqlite storage. More advanced & Configurable.

## Packeges
- @capacitor-community/sqlite (https://github.com/capacitor-community/sqlite)
```
npm install --save @capacitor-community/sqlite
```