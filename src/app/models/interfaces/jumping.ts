
export interface IJumping {
    isJumping: boolean;
    maxJumpHeight: number;
    isFallingDown: boolean;
    prematureEndJumpInterval: () => boolean;
    preventFallingDown: () => boolean;
}