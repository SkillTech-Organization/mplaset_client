import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'user-management',
  styles: [],
  templateUrl: './user-management.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class UserManagementComponent {

}
