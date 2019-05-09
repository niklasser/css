import { Component, OnInit } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TmplAstBoundAttribute } from '@angular/compiler';

@Component({
  selector: 'app-tab-classifier',
  templateUrl: './tab-classifier.page.html',
  styleUrls: ['./tab-classifier.page.scss'],
})
export class TabClassifierPage {
  private os_ip: String;
  private os_port: String;
  private url: any;
  private models: any;
  private model_selected: any;
  private window: any;
  private isSensing: boolean;
  private subscription: any;
  private motions: any[];
  private textStartSensing = "Start Sensing";
  private textStopSensing = "Stop Sensing";
  private textButtonSensing: any;
  private labels: any[];
  private detected_label: any;
  private timer: any;
  // public bg_color: any;
  constructor(private deviceMotion: DeviceMotion, private http_ionic: HTTP, private alertController: AlertController, private storage: Storage) {
    this.url = "http://127.0.0.1:8080/model"
    this.window = 10;
    this.isSensing = false;
    this.motions = []
    this.textButtonSensing = this.textStartSensing;
    storage.get("openscore_ip").then((ip) => {
      this.os_ip = ip;
    });
    storage.get("openscore_port").then((port) => {
      this.os_port = port;
    });
    this.updateURL();

    // this.bg_color = "#ffffff";
  }

  connectServer() {
    this.storage.set("openscore_ip", this.os_ip);
    this.storage.set("openscore_port", this.os_port);
    this.updateURL();
    console.log(this.url)
    this.http_ionic.get(this.url + "/model", {}, {}).then((response) => {
      var data = JSON.parse(response.data)
      console.log(data)
      this.models = data.responses;
    }).catch((error) => {
      console.log("Could not connect to server.")
      this.couldNotConnectAlert('Could not connect to server.');
      this.model_selected = null;
      this.models = [];
    });

  }

  startSensing() {
    if (!this.model_selected)
      return;
    
    if (!this.isSensing) {
      console.log("Start sensing context")
      this.textButtonSensing = this.textStopSensing;
      this.isSensing = true;
      this.subscription = this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
        var motion = {
          "x": acceleration.x,
          "z": acceleration.z
        }
        if (this.window == 1) {
          this.sendObjectToServer(motion);
        } else {
          this.motions.push({ "arguments": motion })
          if (this.motions.length == this.window) {
            this.sendBatchToServer()
            this.motions = [];
          }
        }
      });
    } else {
      console.log("Stop sensing context")
      this.isSensing = false;
      this.textButtonSensing = this.textStartSensing;
      this.subscription.unsubscribe();
      clearInterval(this.timer);
      document.getElementById("overlay").style.display = "none";
      document.getElementById("test").style.backgroundColor = "#ffffff";
      for (let i = 0; i < this.labels.length; i++) {
          this.labels[i].value = ""
      }
    }

  }

  sendBatchToServer() {
    // this.url = "http://" + "129.13.8.26" + ":" + "8080" + "/openscoring/model" + "/css18/batch"
    this.updateURL();
    this.http_ionic.setHeader(this.url, "content-type", "application/json")
    this.http_ionic.setDataSerializer("json")

    let batch = {
      "requests": this.motions
    }

    this.http_ionic.post(this.url + "/model/" + this.model_selected + "/batch", batch, {}).then((response) => {
      this.evaluateData(JSON.parse(response.data))
    }).catch((error) => {
      console.log(error)
    })
  }

  sendObjectToServer(object) {
    // this.url = "http://" + "129.13.8.26" + ":" + "8080" + "/openscoring/model/css18/"
    this.updateURL();
    this.http_ionic.setHeader(this.url, "content-type", "application/json")
    this.http_ionic.setDataSerializer("json")

    let data = {
      "arguments": object
    }
    this.http_ionic.post(this.url + "/model/" + this.model_selected + "/", data, {}).then((response) => {
      this.evaluateData(JSON.parse(response.data))
    }).catch((error) => {
      console.log(error)
    })
  }

  evaluateData(data) {
    let label;
    if (data.responses != undefined) {
      label = data.responses[this.window / 2].result.label;
    } else {
      label = data.result.label
    }
    if (!this.detected_label) {
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].name == label) {
          this.labels[i].value = "Detected"
          this.detected_label = this.labels[i];
        } else {
          this.labels[i].value = ""
        }
      }
      this.timer = setInterval(this[this.detected_label.function], 1000);
    } else if (this.detected_label.name != label) {
      console.log("Changed Label! to " + this.detected_label.name + " form " + label)
      document.getElementById("overlay").style.display = "none";
      document.getElementById("test").style.backgroundColor = "#ffffff";
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].name == label) {
          this.labels[i].value = "Detected"
          this.detected_label = this.labels[i];
        } else {
          this.labels[i].value = ""
        }
      }
      clearInterval(this.timer);
      this.timer = setInterval(this[this.detected_label.function], 1000);
    }
  }

  labelChange(label, event) {
    label.function = event.detail.value
  }

  async couldNotConnectAlert(message) {
    await this.startAlert("Connection failed", message);
  }
  async startAlert(header, message) {
    const alert = await this.alertController.create({
      message: header,
      subHeader: message,
      buttons: ['Dismiss']
    });
    await alert.present();
  }

  updateURL() {
    this.url = "http://" + this.os_ip + ":" + this.os_port + "/openscoring";
  }

  modelChange() {
    console.log("Selected model:" + this.model_selected)
    this.storage.set("openscore_ip", this.os_ip);
    this.storage.set("openscore_port", this.os_port);
    this.updateURL();

    this.http_ionic.get(this.url + "/model/" + this.model_selected, {}, {}).then((response) => {
      let tmp = JSON.parse(response.data)
      this.labels = [];
      for (let label in tmp.schema.targetFields[0].values) {
        this.labels.push({ name: label, value: "", function: "" })
      }

    }).catch((error) => {
      console.log("Could not connect to server.")
      this.couldNotConnectAlert('Could not load model data from server.');
    });
  }

  checkOccurance(array) {
    if (array.length == 0)
      return null;
    let modeMap = {};
    let maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      let el = array[i];
      if (modeMap[el] == null)
        modeMap[el] = 1;
      else
        modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }
  

  changefont() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    document.getElementById("test").style.backgroundColor = color;
  }

  blockscreen() {
    console.log("Blocking screen!")
    document.getElementById("overlay").style.display = "block";
  }

}
