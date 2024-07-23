import { inject, Injectable } from "@angular/core";
import { Globals } from "../shared/globals";
import { GameState } from "../models/gameState";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class GameStateService {
    constructor(private router: Router) {
    }
    readonly dialog = inject(MatDialog);
    pauseGame() {
       Globals.gameState = (Globals.gameState === GameState.running)? GameState.paused: GameState.running;
    }

    changeGameState(gameState: GameState) {
        Globals.gameState = gameState;
    }

    leavedGame() {
        setTimeout(() => {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '250px'
          });
          dialogRef.afterClosed().subscribe((value: boolean) => {
            if (value) {
              Globals.gameState = GameState.new;
              this.router.navigate(['']);
            }
          })
        });
      }

}