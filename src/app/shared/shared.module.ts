import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng-lts/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PanelModule } from 'primeng-lts/panel';
import { ButtonModule } from 'primeng-lts/button';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
// tslint:disable-next-line:max-line-length
import { InputTextModule, DropdownModule, FieldsetModule, CheckboxModule, KeyFilterModule, MultiSelectModule, DialogModule, TabViewModule } from 'primeng-lts/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng-lts/tooltip';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { PickListModule } from 'primeng-lts/picklist';
import { ChartModule } from 'primeng-lts/chart';
import { ToastModule } from 'primeng-lts/toast';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    FieldsetModule,
    PanelModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    ToolbarModule,
    ConfirmDialogModule,
    CheckboxModule,
    KeyFilterModule,
    MultiSelectModule,
    TooltipModule,
    FileUploadModule,
    DialogModule,
    PickListModule,
    ChartModule,
    TabViewModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TableModule,
    FieldsetModule,
    PanelModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    ToolbarModule,
    ConfirmDialogModule,
    CheckboxModule,
    KeyFilterModule,
    TooltipModule,
    FileUploadModule,
    DialogModule,
    PickListModule,
    ChartModule,
    TabViewModule,
    ToastModule
  ]
})
export class SharedModule { }
