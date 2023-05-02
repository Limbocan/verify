import type { VerifyProps } from '../types/props';
export declare class Verify {
    #private;
    root: HTMLElement | null | string;
    appRef: any;
    width: string | number;
    height: string | number;
    verifyX: number;
    verifyY: number;
    constructor({ component, componentName, root, width, height, verifyX, verifyY, }: VerifyProps);
    fillImage: () => void;
    moveClip: (_x: number, _y: number) => void;
}
export default Verify;
