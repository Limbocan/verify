import { Signal } from 'solid-js';
import { TriggerType } from '../types/props.d';
import type { VerifyProps } from '../types/props';
export declare class Verify {
    #private;
    [key: string]: any;
    root: Signal<any>[0];
    component: Signal<boolean>[0];
    componentName: Signal<string>[0];
    width: Signal<number>[0];
    height: Signal<number>[0];
    verifyX: Signal<number>[0];
    verifyY: Signal<number>[0];
    deviation: Signal<number>[0];
    trigger: Signal<TriggerType>[0];
    constructor(props: VerifyProps);
    updateSlide: (props: {
        verifyX: number;
        verifyY: number;
    }) => void;
    resetSlide: () => void;
}
export default Verify;
