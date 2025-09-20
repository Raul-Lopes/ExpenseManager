import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

    title = "About";

    constructor(
        private router: Router
    ) { }

    goToList() {
        this.router.navigate(['/expenses']);
    }
    //------------ oninput
    // @Input('data') data: Data;
    // constructor(private router: Router) {
    //     console.log(`new - data is ${this.data} `);
    // }
    ngOnChanges() {
        console.log("Passed ==> ngOnChanges");
    }
    ngOnInit() {
        console.log("Passed ==> ngOnInit");
    }
    ngDoCheck() {
        console.log("Passed ==> ngDoCheck")
    }
    ngAfterContentInit() {
        console.log("Passed ==> ngAfterContentInit");
    }
    ngAfterContentChecked() {
        console.log("Passed ==> ngAfterContentChecked");
    }
    ngAfterViewInit() {
        console.log("Passed ==> ngAfterViewInit");
    }
    ngAfterViewChecked() {
        console.log("Passed ==> ngAfterViewChecked");
    }
    ngOnDestroy() {
        console.log("Passed ==> ngOnDestroy");
    }
}