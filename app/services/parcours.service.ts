import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Parcours } from '../shared/parcours';

@Injectable({
  providedIn: 'root'
})
export class ParcoursService {

  private currentUser: firebase.User = null;

  constructor(private afs: AngularFirestore) {
  }

  getParcours(): Observable<Parcours[]> {
    return this.afs.collection<Parcours>('parcours').snapshotChanges()
               .pipe(map(actions => {
                  return actions.map(action => {
                    const data = action.payload.doc.data() as Parcours;
                    const _id = action.payload.doc.id;
                    console.log(data);
                    return { _id, ...data };
                });
    }));
  }

  getParcoursById(id: number): Observable<Parcours> {
    return this.afs.doc<Parcours>('ybalservice/parscours/' + id).snapshotChanges()
               .pipe(map(action => {
                    const data = action.payload.data() as Parcours;
                    const _id = action.payload.id;
                    return { _id, ...data };
               }));
  }


  /*postComment(dishId: string, comment: any): Promise<any> {
    if (this.currentUser) {
      return this.afs.collection('dishes').doc(dishId).collection('comments')
        .add({
          author: {
            '_id': this.currentUser.uid,
            'firstname' : this.currentUser.displayName ? this.currentUser.displayName : this.currentUser.email
          },
          rating: comment.rating,
          comment: comment.comment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
           updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  getComments(dishId: string): Observable<any> {
   return this.afs.collection('dishes').doc(dishId).collection('comments').valueChanges();
  }*/
}
