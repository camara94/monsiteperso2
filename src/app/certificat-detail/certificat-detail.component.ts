import { CertificatService } from './../services/certificat.service';
import { Certificat } from './../shared/certificat';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Comment } from '../shared/comment';
import { FavoriteService } from '../services/favorite.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-certificat-detail',
  templateUrl: './certificat-detail.component.html',
  styleUrls: ['./certificat-detail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class CertificatDetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;
  certificat: Certificat;
  certificatcopy: Certificat;
  certificatIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  errMess: string;
  visibility = 'shown';
  favorite = false;

  formErrors = {
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  commentForm: FormGroup;

  constructor(private certificatService: CertificatService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { }

    ngOnInit() {
      this.createForm();

      this.certificatService.getCertificatIds().subscribe(certificatIds => this.certificatIds = certificatIds);
     setTimeout(() => {
      console.log('les ids', this.certificatIds);
      this.route.params.pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.certificatService.getCertificatById(params['id']); }))
                    .subscribe(certificat => {
                        this.certificat = certificat;
                        this.certificatService.getComments(this.certificat.id)
                        .subscribe(comments => this.certificat.comments = comments);
                        this.setPrevNext(certificat.id);
                        this.visibility = 'shown';
                        this.favoriteService.isFavorite(this.certificat.id)
                        .then(value => {
                          this.favorite = value;
                          console.log('Dishdetail favorite ', this.favorite);
                      });
                    },
      errmess => this.errMess = <any>errmess);

    }, 1000);
  }

  setPrevNext(certificatId: string) {
    const index = this.certificatIds.indexOf(certificatId);
    console.log(index);
    this.prev = this.certificatIds[(this.certificatIds.length + index - 1) % this.certificatIds.length];
    this.next = this.certificatIds[(this.certificatIds.length + index + 1) % this.certificatIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.certificatService.postComment(this.certificat.id, this.commentForm.value)
      .then(() => {
        this.certificatService.getComments(this.certificat.id)
          .subscribe(comments => this.certificat.comments = comments);
      },
      err => console.log('Error ', err));
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  addToFavorites() {
    if (!this.favorite) {
      this.favoriteService.postFavorite(this.certificat.id)
        .then(favorites => { console.log(favorites); this.favorite = true; })
        .catch(err => console.log('Error ', err));
    }
  }
}
