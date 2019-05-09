import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
export declare class AppComponent {
    private platform;
    private splashScreen;
    private statusBar;
    constructor(platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar);
    initializeApp(): void;
}
