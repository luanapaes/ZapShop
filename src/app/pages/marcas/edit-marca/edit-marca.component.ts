import { Component, inject } from '@angular/core';
import { MarcasService } from '../../../shared/services/MarcasService.service';
import { CustomMarca } from '../../../shared/interfaces/custom-marca.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from '../../../shared/interfaces/marca.interface';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-marca',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent,
    MatDialogActions, MatDialogClose,
    MatButtonModule, MatFormFieldModule,
    MatSelectModule, FormsModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './edit-marca.component.html',
  styleUrl: './edit-marca.component.scss'
})
export class EditMarcaComponent {
  marcasService = inject(MarcasService);
  marca: CustomMarca = inject(ActivatedRoute).snapshot.data['nome_marca'];
  matSnackBar = inject(MatSnackBar);
  route = inject(Router);

  marcaID: string | undefined = '';
  arrayCategorias: string[] = [];
  categoriasList: string[] = ['Perfume', 'Hidratante', 'Kit', 'Maquiagem', 'Hidratação', 'Skincare'];

  imageSrc: string | ArrayBuffer | File | null = null;

  initMarca: Marca = {
    nome_marca: '',
    categorias: '',
    logomarca: ''
  }

  marcaForm = new FormGroup({
    nome_marca: new FormControl(),
    categorias: new FormControl(),
    logomarca: new FormControl()
  });

  ngOnInit(): void {
    //pega o id da url que vem por ex: marcas/32 
    const id = this.route.url.split("/").pop() as unknown as number;

    this.marcaID = this.route.url.split("/").pop()
    this.getMarca(id)
  }

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


  getMarca(id: number) {
    this.marcasService.getMarcaByID(id).subscribe(
      (marca) => {
        this.initMarca = {
          nome_marca: marca.nome_marca,
          categorias: marca.categorias,
          logomarca: marca.logomarca
        }

        const cat = String(this.initMarca.categorias)
        this.arrayCategorias = cat.split(",").map(item => item.trim())

        this.marcaForm.patchValue({
          nome_marca: marca.nome_marca,
          categorias: this.arrayCategorias,
          logomarca: ''
        })
      }
    )
  }

  onSubmit() {
    if (this.marcaForm) {
      this.marcasService.editarMarca(
        this.marcaID as string,
        this.marcaForm.value.nome_marca,
        this.marcaForm.value.categorias,
        this.imageSrc as File
      ).subscribe(() => {
        this.matSnackBar.open("Marca editada com sucesso!", "OK");
        this.route.navigate(['marcas']);
      })
    } else {
      this.matSnackBar.open("Marca não editada.", "OK")
    }
  }
}
