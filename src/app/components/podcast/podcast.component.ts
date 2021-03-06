import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter, flatMap, map } from "rxjs/operators";
import { Episode } from "../../../lib/models/parsePodcastEpisodes";
import { Podcast } from "../../../lib/models/Podcast";
import { currentEpisode, db$, episodePlayed } from "../../../lib/rss/data";

@Component({
  selector: "app-podcast",
  templateUrl: "./podcast.component.html",
  styleUrls: ["./podcast.component.scss"],
})
export class PodcastComponent implements OnInit, OnDestroy {
  public podcast: Podcast;
  public episodes: Episode[];
  public playingEpisode?: Episode;
  public currentEpisode$ = currentEpisode.subscribe((episode) => {
    this.playingEpisode = episode;
    console.log(this.playingEpisode);
  });
  constructor(public activatedRoute: ActivatedRoute) {}
  ngOnDestroy(): void {
    this.currentEpisode$.unsubscribe();
  }

  playEpisode(episode: Episode): void {
    currentEpisode.next(episode);
  }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map(async (params) => {
          await this.updateView(params["_id"]);
        }),
        flatMap((o) => o)
      )
      .subscribe();
  }

  episodePlaying(episode: Episode) {
    // episo
  }
  async updateView(_id: string): Promise<void> {
    try {
      this.podcast = (await db$
        .get(_id ? _id : "")
        .pipe(filter((dbItem) => dbItem?.tags.includes("podcast") === true))
        .toPromise()) as Podcast;

      this.episodes = (await db$
        .bulkGet(
          this.podcast.episodeIDS.map((id) => {
            return { id: id };
          })
        )
        .toPromise()) as Episode[];

      // console.log(this.podcast);
    } catch (error) {
      console.log(error);
    }
  }
}
