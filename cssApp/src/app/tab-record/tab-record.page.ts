import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab-record',
  templateUrl: 'tab-record.page.html',
  styleUrls: ['tab-record.page.scss'],
})
export class TabRecordPage {
  public isRecording: boolean;
  private subscription: any;
  private motion: any;
  private events: any;
  private recordingButtonText: any;
  private textStartRecordig = "Start recording";
  private textStopRecording = "Stop recording";
  private influx_ip: String;
  private influx_port: String;
  private url: any;
  private label: String;
  private record_name: String;

  constructor(private deviceMotion: DeviceMotion, private http: HttpClient, private storage: Storage) {
    this.isRecording = false;
    this.motion = { "X": 0, "Y": 0, "Z": 0, "timestamp": 0 }
    this.events = 0;
    this.recordingButtonText = this.textStartRecordig;
    storage.get("influx_ip").then((ip) => {
      this.influx_ip = ip;
    });
    storage.get("influx_port").then((port) => {
      this.influx_port = port;
    });
    this.url = "http://" + this.influx_ip + ":" + this.influx_port + "/write?db=training"
  }

  startRecording() {
    this.writeData(1, 2, 3, 1398902555536968492)
    if (this.isRecording == false) {
      console.log("Start recording")
      this.subscription = this.deviceMotion.watchAcceleration({ frequency: 50 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.motion.X = acceleration.x;
        this.motion.Y = acceleration.y;
        this.motion.Z = acceleration.z;
        this.motion.timestamp = acceleration.timestamp;
        this.writeData(this.motion.X, this.motion.Y, this.motion.Z, Math.trunc(acceleration.timestamp));
        this.events++;
      });
      this.isRecording = true;
      this.recordingButtonText = this.textStopRecording;
    } else {
      console.log("Stop recording")
      this.subscription.unsubscribe();
      this.isRecording = false;
      this.recordingButtonText = this.textStartRecordig;
    }
  }
  updateURL() {
    this.storage.set("influx_ip", this.influx_ip);
    this.storage.set("influx_port", this.influx_port);
    this.url = "http://" + this.influx_ip + ":" + this.influx_port + "/write?db=training";
    console.log(this.url)
  }

  writeData(x, y, z, timestamp) { 
    this.http.post(this.url, 
      "contextdata," + 'label=' + this.label + ",record=" + this.record_name + ' x=' + x + ' ' + timestamp
    ).subscribe((response) => {
      console.log(response);
    });
    this.http.post(this.url, 
      "contextdata," + 'label=' + this.label + ",record=" + this.record_name + ' y=' + y  + ' ' + timestamp
    ).subscribe((response) => {
      console.log(response);
    });
    this.http.post(this.url, 
      "contextdata," + 'label=' + this.label + ",record=" + this.record_name + ' z=' + z + ' ' + timestamp
    ).subscribe((response) => {
      console.log(response);
    });
  }
}
