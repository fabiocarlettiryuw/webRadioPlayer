import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MplayerRemoteService } from '../mplayer-remote.service';
import { WebRadioEditorComponent } from '../web-radio-editor/web-radio-editor.component';
import { WebRadioBrowserPlayerComponent } from '../web-radio-browser-player/web-radio-browser-player.component';

@Component({
  selector: 'app-web-radio-item',
  templateUrl: './web-radio-item.component.html',
  styleUrls: ['./web-radio-item.component.css']
})
export class WebRadioItemComponent {
  @Input() url: any = {};
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() stop: EventEmitter<any> = new EventEmitter();
  @Output() pause: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private mPlayer: MplayerRemoteService
  ) { }

  playWebRadioInBrowser() {
    const dialogRef = this.dialog.open(
      WebRadioBrowserPlayerComponent, {
        data: Object.assign({}, this.url),
        closeOnNavigation: false,
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editWebRadio() {
    const dialogRef = this.dialog.open(WebRadioEditorComponent, {
      width: '40%',
      data: {
        url: this.url,
        dialogType: 'edit',
        dialogTitle: 'Modifier une web radio'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mPlayer.updateUrl(result.url);
    });
  }
  duplicateWebRadio() {
    const dialogRef = this.dialog.open(WebRadioEditorComponent, {
      width: '40%',
      data: {
        url: Object.assign({}, {name: 'Copie de '.concat(this.url.name), url: this.url.url}),
        dialogType: 'copy',
        dialogTitle: 'Dupliquer une web radio'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mPlayer.addUrl(result.url);
    });
  }
  deleteWebRadio() {
    if (confirm(`Étes-vous sûr(e) de vouloir supprimer ${this.url.name} ?`)) {
      this.mPlayer.deleteUrl(this.url);
    }
  }

  actionPlay() {
    this.play.emit(this.url);
  }
  actionStop() {
    this.stop.emit(this.url);
  }
  actionPause() {
    this.pause.emit(this.url);
  }

}
