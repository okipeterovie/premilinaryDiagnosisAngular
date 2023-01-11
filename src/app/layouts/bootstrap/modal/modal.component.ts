import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngb-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalTitle: any = "Information";
  @Input() modalBody: any;
  @Input() modalFooter: any;

  @Input() enableHeaderCloseButton: boolean = true;
  @Input() enableTitleButton: boolean = true;
  @Input() enableCloseButton: boolean = true;

  @Input() closeButtonStyle = "btn-danger";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }


}
