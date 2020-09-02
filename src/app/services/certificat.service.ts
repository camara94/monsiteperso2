import { AuthService } from './auth.service';
import { Certificat } from './../shared/certificat';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class CertificatService {

  private currentUser: firebase.User = null;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
    ) {
  }

  getCertificats(): Observable<Certificat[]> {
    return this.afs.collection<Certificat>('certificats').snapshotChanges()
               .pipe(map(actions => {
                  return actions.map(action => {
                    const data = action.payload.doc.data() as Certificat;
                    const _id = action.payload.doc.id;
                    console.log(data);
                    return { _id, ...data };
                });
    }));
  }

  getCertificatById(id: string): Observable<Certificat> {
    return this.afs.collection<Certificat>('certificats', ref => ref.where('id', '==', id)).snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Certificat;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      })[0];
    }));
  }

  getCertificatIds(): Observable<String[] | any> {
    return this.getCertificats()
          .pipe(map(certifificats => certifificats.map(certifificat => certifificat.id)))
          .pipe(catchError(error => error ));
  }

  postComment(dishId: string, comment: any): Promise<any> {
    if (this.currentUser) {
      return this.afs.collection('').doc(dishId).collection('comments')
        .add({
          author: {
            '_id': this.currentUser.uid,
            'firstname' : this.currentUser.displayName ? this.currentUser.displayName : this.currentUser.email
          },
          rating: comment.rating,
          comment: comment.comment,
         // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          //updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  getComments(dishId: string): Observable<any> {
    return this.afs.collection('certificat').doc(dishId).collection('comments').valueChanges();
  }

}
