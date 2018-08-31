import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../_services/Details.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {

  numbers: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private detailsService: DetailsService) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.detailsService.getNumbers(id).subscribe( response => {
      this.numbers = response;
    });
  }

}
