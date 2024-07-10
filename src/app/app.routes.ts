import { Routes } from '@angular/router';
import { ChooseGameComponent } from './shared/choose-game/choose-game.component';
import { PenaltyShotsComponent } from './games/penalty-shots/penalty-shots.component';
import { DodgeTheBallsComponent } from './games/dodge-the-balls/dodge-the-balls.component';
import { ArkanoidComponent } from './games/arkanoid/arkanoid.component';
import { PlatformComponent } from './games/platform/platform.component';

export const routes: Routes = [
    {
        path:'',
        component: ChooseGameComponent
    },
    {
        path:'penalty',
        component: PenaltyShotsComponent
    },
    {
        path:'dodgeTheAsteroids',
        component: DodgeTheBallsComponent
    },
    {
        path:'arkanoid',
        component: ArkanoidComponent
    },
    {
        path:'pokemon',
        component: PlatformComponent
    },
]
