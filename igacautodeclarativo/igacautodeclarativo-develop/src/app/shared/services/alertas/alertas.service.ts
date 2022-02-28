import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {BehaviorSubject} from 'rxjs';
import {Alerta} from 'src/app/shared/interfaces/alertas/alerta';

@Injectable({
    providedIn: 'root'
})
export class AlertasService {

    constructor() {
    }

    mensajeSuccess(alerta: Alerta): any {
        const modalBehavior = new BehaviorSubject({});
        const $modalBehavior = modalBehavior.asObservable();

        Swal.fire({
            title: alerta.title,
            text: alerta.text,
            icon: 'success',
            html: alerta.textHtml,
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#1976d2',
            cancelButtonColor: 'dimgrey',
            cancelButtonText: 'CANCELAR',
            confirmButtonText: alerta.btnText,
            reverseButtons: true,
            customClass: {
                popup: 'popup-confirm',
                header: 'header-confirm',
                closeButton: 'close-button',
                icon: 'icon-confirm',
                content: 'content-confirm',
                cancelButton: 'cancel-button btn-round',
                confirmButton: 'confirm-button btn-round',
            }
        }).then((result) => {
            if (result) {
                modalBehavior.next(result);
            }
        });

        return $modalBehavior;
    }

    mensajeError(alerta: Alerta): any {
        const modalBehavior = new BehaviorSubject({});
        const $modalBehavior = modalBehavior.asObservable();

        Swal.fire({
            title: alerta.title,
            text: alerta.text,
            icon: 'error',
            showCancelButton: true,
            cancelButtonColor: 'dimgrey',
            cancelButtonText: alerta.btnClose,
            reverseButtons: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            html: alerta.textHtml,
            customClass: {
                popup: 'popup-error',
                header: 'header-error',
                closeButton: 'close-button',
                icon: 'icon-confirm',
                content: 'content-error',
            }
        }).then((result) => {
            if (result.value) {
                modalBehavior.next(result);
            }
        });

        return $modalBehavior;
    }

    mensajeWarn(alerta: Alerta): any {
        const modalBehavior = new BehaviorSubject({});
        const $modalBehavior = modalBehavior.asObservable();

        Swal.fire({
            title: alerta.title,
            text: alerta.text,
            icon: 'warning',
            html: alerta.textHtml,
            showCancelButton: alerta.showCancelButton,
            confirmButtonColor: '#1976d2',
            cancelButtonColor: 'dimgrey',
            cancelButtonText: alerta.btnClose,
            confirmButtonText: alerta.btnText,
            allowOutsideClick: false,
            allowEscapeKey: false,
            reverseButtons: true,
            showConfirmButton: alerta.showConfirmButton,
            customClass: {
                popup: 'popup-confirm',
                header: 'header-confirm',
                closeButton: 'close-button',
                icon: 'icon-confirm',
                content: 'content-confirm',
                cancelButton: 'cancel-button btn-round',
                confirmButton: 'confirm-button btn-round',
            }
        }).then((result) => {
            //HABLAR CON LA PERSONA PARA QUE CONTROLAR EL ERROR SI PASA ALGO EN LA APP
            if (result.value || result.dismiss) {
                modalBehavior.next(result);
            }
        });

        return $modalBehavior;
    }

    mensajeInfo(alerta: Alerta): any {
        const modalBehavior = new BehaviorSubject({});
        const $modalBehavior = modalBehavior.asObservable();

        Swal.fire({
            title: alerta.title,
            text: alerta.text,
            showCancelButton: false,
            showConfirmButton: alerta.showConfirmButton,
            confirmButtonColor: '#1976d2',
            cancelButtonColor: 'dimgrey',
            cancelButtonText: 'CANCELAR',
            confirmButtonText: alerta.btnText,
            allowOutsideClick: false,
            allowEscapeKey: false,
            width: 750,
            html: alerta.textHtml,
            focusConfirm: false,
            customClass: {
                popup: 'popup-info',
                header: 'header-info',
                title: 'subtitle-govco',
                closeButton: 'close-button',
                content: 'content-info',
                confirmButton: 'confirm-button btn-round',
            }
        }).then();

        return $modalBehavior;
    }

    mensajeNotificacion(alerta: Alerta): any {
        const modalBehavior = new BehaviorSubject({});
        const $modalBehavior = modalBehavior.asObservable();

        Swal.fire({
            title: alerta.title,
            text: alerta.text,
            html: alerta.textHtml,
            showCancelButton: alerta.showCancelButton,
            confirmButtonColor: '#1976d2',
            cancelButtonColor: 'dimgrey',
            cancelButtonText: alerta.btnClose,
            confirmButtonText: alerta.btnText,
            allowOutsideClick: false,
            allowEscapeKey: false,
            reverseButtons: true,
            customClass: {
                popup: 'popup-confirm buzon-popup',
                header: 'header-confirm',
                closeButton: 'close-button',
                icon: 'icon-confirm',
                content: 'content-confirm',
                cancelButton: 'cancel-button btn-round',
                confirmButton: 'confirm-button btn-round',
            }
        }).then((result) => {
            if (result.value) {
                modalBehavior.next(result);
            }
        });

        return $modalBehavior;
    }
}
