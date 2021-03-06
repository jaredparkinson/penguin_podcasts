import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { db$, downloadPodcast, loadTestData } from "../../lib/rss/data";
import { podcastUpdate, updatePodcasts } from "../../lib/rss/podcastUpdate";
import { removePodcast } from "../../lib/rss/removePodcast";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  async test() {
    await loadTestData();
    // removePodcast("http://localhost:4200/assets/rss.xml").subscribe((o) =>
    //   console.log(o)
    // );

    // db$.allDocs().subscribe((o) => console.log(o));
    // updatePodcasts().subscribe();
    // downloadPodcast("http://localhost:4200/assets/rss.xml")
    //   .pipe(
    //     map(([podcast, episodes]) => {
    //       podcastUpdate([podcast, episodes]);
    //     })
    //   )
    //   .subscribe();
    //   .pipe(
    //     catchError((err) => {
    //       throw err;
    //     })
    //   )
    //   .subscribe(
    //     () => {
    //       console.log("asdfioj8239");
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }
}
