import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {

    readonly animal = signal('');
    readonly name = model('');
    readonly dialog = inject(MatDialog);
    readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
    readonly data: string  = 'Deseja realmente remover o cliente?';


    openDialog(): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {name: this.name(), animal: this.animal()},
      });

      dialogRef.afterClosed().subscribe( (result : boolean) => {
      });
    }

    OnConfirm(result: boolean): void{
        this.dialogRef.close(result);
    }
}


