import { Projet } from './../shared/projet';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {


  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
    ) {
  }


  getProjets(): Observable<Projet[]> {
    return this.afs.collection<Projet>('projets').snapshotChanges()
               .pipe(map(actions => {
                  return actions.map(action => {
                    const data = action.payload.doc.data() as Projet;
                    const _id = action.payload.doc.id;
                    console.log(data);
                    return { _id, ...data };
                });
    }));
  }

  getCertificatById(id: string): Observable<Projet> {
    return this.afs.collection<Projet>('projet', ref => ref.where('id', '==', id)).snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Projet;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      })[0];
    }));
  }

}
