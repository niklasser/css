import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabRecordPage } from './tab-record.page';
var TabRecordModule = /** @class */ (function () {
    function TabRecordModule() {
    }
    TabRecordModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild([
                    {
                        path: '',
                        component: TabRecordPage
                    }
                ])
            ],
            declarations: [TabRecordPage]
        })
    ], TabRecordModule);
    return TabRecordModule;
}());
export { TabRecordModule };
//# sourceMappingURL=tab-record.module.js.map