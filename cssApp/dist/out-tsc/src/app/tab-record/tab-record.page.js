import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { HttpClient } from '@angular/common/http';
import Influx from "influx";
var TabRecordPage = /** @class */ (function () {
    function TabRecordPage(deviceMotion, http) {
        this.deviceMotion = deviceMotion;
        this.http = http;
        this.textStartRecordig = "Start recording";
        this.textStopRecording = "Stop recording";
        this.isRecording = false;
        this.motion = { "X": 0, "Y": 0, "Z": 0, "timestamp": 0 };
        this.events = 0;
        this.recordingButtonText = this.textStartRecordig;
        this.url = "http://127.0.0.1:8086/write?db=training";
    }
    TabRecordPage.prototype.startRecording = function () {
        var _this = this;
        // this.http.post(this.url, [{
        //   "body":'myseries value=0.64'
        // }]).subscribe((response) => {
        //   console.log(response);
        // });
        console.dir(Influx);
        if (this.isRecording == false) {
            console.log("Start recording");
            this.subscription = this.deviceMotion.watchAcceleration({ frequency: 50 }).subscribe(function (acceleration) {
                _this.motion.X = acceleration.x;
                _this.motion.Y = acceleration.y;
                _this.motion.Z = acceleration.z;
                _this.motion.timestamp = acceleration.timestamp;
                _this.events++;
            });
            this.isRecording = true;
            this.recordingButtonText = this.textStopRecording;
        }
        else {
            console.log("Stop recording");
            this.subscription.unsubscribe();
            this.isRecording = false;
            this.recordingButtonText = this.textStartRecordig;
        }
    };
    TabRecordPage.prototype.updateURL = function () {
        this.url = "http://" + this.influx_ip + ":" + this.influx_port + "/write?db=training";
        console.log(this.url);
    };
    TabRecordPage = tslib_1.__decorate([
        Component({
            selector: 'app-tab-record',
            templateUrl: 'tab-record.page.html',
            styleUrls: ['tab-record.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [DeviceMotion, HttpClient])
    ], TabRecordPage);
    return TabRecordPage;
}());
export { TabRecordPage };
//# sourceMappingURL=tab-record.page.js.map