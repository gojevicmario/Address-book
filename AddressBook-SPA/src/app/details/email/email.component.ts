import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../_services/Details.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emails: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private detailsService: DetailsService) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.detailsService.getEmails(id).subscribe( response => {
      this.emails = response;
    });
  }

}
