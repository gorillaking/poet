import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.css']
})
export class EnterNameComponent implements OnInit {
  @Output() submitName = new EventEmitter();
  playerName: string = '';
  invalidName: boolean = false;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    console.log(this.playerService.getPlayer().name);
    this.playerName = this.playerService.getPlayer().name;
  }

  keyup(val: string): void {
    this.playerName = val;
  }

  click() {
    if(!this.playerName.trim()) {
      this.playerService.savePlayer(this.playerName);
      this.invalidName = true;
    } else {
      this.playerService.savePlayer(this.playerName);
      this.invalidName = false;
      this.submitName.emit();
    }

    
  }
}
