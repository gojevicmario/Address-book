import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../_services/Details.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private detailsService: DetailsService) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.detailsService.getTags(id).subscribe( response => {
      this.tags = response;
    });
  }

}
