import { Injectable, TemplateRef } from '@angular/core';

/**
 * DO NOT FORGET TO ADD 
 * <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
 * TO ANY HTML PAGE OR ROOT APP HTML TO ENJOY TOASTER
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];

    show(textOrTpl: string | TemplateRef<any>, options: any = {}, header?: string) {
        this.toasts.push({ header, textOrTpl, ...options });
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    showStandard(textOrTpl: string, header?: string) {
        this.show(textOrTpl, {}, header);
    }

    showInfo(textOrTpl: string, header?: string) {
        this.show(textOrTpl, { classname: 'bg-primary text-light' }, header);
    }

    showSuccess(textOrTpl: string, header?: string) {
        this.show(textOrTpl, { classname: 'bg-success text-light', delay: 10000 }, header);
    }

    showWarning(textOrTpl: string, header?: string) {
        this.show(textOrTpl, { classname: 'bg-warning text-light', delay: 10000 }, header);
    }

    showDanger(textOrTpl: string, header?: string) {
        this.show(textOrTpl, { classname: 'bg-danger text-light', delay: 15000 }, header);
    }
}