import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { HttpClient } from '@angular/common/http';
export declare class TabRecordPage {
    private deviceMotion;
    private http;
    isRecording: boolean;
    private subscription;
    private motion;
    private events;
    private recordingButtonText;
    private textStartRecordig;
    private textStopRecording;
    private influx_ip;
    private influx_port;
    private url;
    constructor(deviceMotion: DeviceMotion, http: HttpClient);
    startRecording(): void;
    updateURL(): void;
}
