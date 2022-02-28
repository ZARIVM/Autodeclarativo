import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  handleError(error: HttpErrorResponse): void {
    console.log(error);
    if (error.error && error.error.message) {
      console.log(error.error.message);
      this.snackBar.open(error.error.message, null, {duration: 4000});
    } else {
      const message = 'No es posible encontrar el servidor';
      console.log(message);
      this.snackBar.open(message, null, {duration: 4000});
    }
  }
}
