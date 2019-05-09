import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabClassifierPage } from './tab-classifier.page';
var routes = [
    {
        path: '',
        component: TabClassifierPage
    }
];
var TabClassifierPageModule = /** @class */ (function () {
    function TabClassifierPageModule() {
    }
    TabClassifierPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TabClassifierPage]
        })
    ], TabClassifierPageModule);
    return TabClassifierPageModule;
}());
export { TabClassifierPageModule };
//# sourceMappingURL=tab-classifier.module.js.map