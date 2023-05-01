import type { VerifyProps } from './props';
export declare class Verify {
    #private;
    root: HTMLElement | null | string;
    width: string | number;
    height: string | number;
    constructor({ component, componentName, root, width, height }: VerifyProps);
    renderVerify: () => Error | undefined;
}
export default Verify;
