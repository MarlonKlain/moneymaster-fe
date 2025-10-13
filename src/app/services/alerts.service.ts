import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  async confirmAction(title: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      customClass: {
        title: '.title-text',
        confirmButton: '.confirm-btn',
        denyButton: '.deny-btn',
      },
    }).then((result: SweetAlertResult) => {
      return result.isConfirmed;
    });
  }

  showSuccess(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonColor: '#16A34A',
      customClass: {
        confirmButton: 'confirm-btn',
        denyButton: 'deny-btn',
      },
    });
  }

  showError(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }
}
