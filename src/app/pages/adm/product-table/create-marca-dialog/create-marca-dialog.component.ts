import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MarcasService } from '../../../../shared/services/MarcasService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-marca-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, 
    MatDialogActions, MatDialogClose, 
    MatButtonModule, MatFormFieldModule, 
    MatSelectModule, FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-marca-dialog.component.html',
  styleUrl: './create-marca-dialog.component.scss'
})
export class CreateMarcaDialogComponent {
  categoriasList: string[] = ['Perfume', 'Hidratante', 'Kit', 'Maquiagem', 'Hidratação', 'Skincare'];
  imageSrc: string | ArrayBuffer | File | null = null;
  
  marcasService = inject(MarcasService);
  matSnackBar = inject(MatSnackBar);
  route = inject(Router)
  
  marcaForm = new FormGroup({
    nome_marca: new FormControl(),
    categorias: new FormControl(),
    logomarca: new FormControl()
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageSrc = reader.result as string | ArrayBuffer;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(){
    if(this.marcaForm.valid){
      this.marcasService.cadastrarMarca(
        this.marcaForm.value.nome_marca,
        this.marcaForm.value.categorias,
        this.imageSrc as File
      ).subscribe(() => {
        this.matSnackBar.open("Marca cadastrada com sucesso!");
        this.route.navigate(["area-adm"]);
      })
    } else{
      this.matSnackBar.open("Marca não cadastrada.")
    }
  }
}
