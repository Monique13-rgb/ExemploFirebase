import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Produto } from './models/produto.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  produtos: Produto[] = [];

  constructor(private firestore: AngularFirestore) { }
ngOnInit(): void {

  this.firestore.collection<Produto>('produtos').get()
  .toPromise()
  .then(documentData => {
  
  this.produtos = documentData.docs.map( doc => {
    
    return {
     id:doc.id,
    ...doc.data()
     } as Produto;
});

})
.catch(erro => {
console.log(erro);
})
}

}
