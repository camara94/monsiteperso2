import { Apropos } from './../shared/apropos';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AproposService {


  private currentUser: firebase.User = null;

  constructor(private afs: AngularFirestore) {
  }

  getApropos(): Observable<Apropos[]> {
    return this.afs.collection<Apropos>('apropos').snapshotChanges()
               .pipe(map(actions => {
                  return actions.map(action => {
                    const data = action.payload.doc.data() as Apropos;
                    const _id = action.payload.doc.id;
                    console.log(data);
                    return { _id, ...data };
                });
    }));
  }

  getAproposById(id: number): Observable<Apropos> {
    return this.afs.doc<Apropos>('apropos' + id).snapshotChanges()
               .pipe(map(action => {
                    const data = action.payload.data() as Apropos;
                    const _id = action.payload.id;
                    return { _id, ...data };
               }));
  }

}
