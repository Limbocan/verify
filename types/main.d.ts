import { Signal } from 'solid-js';
import { TriggerType } from '../types/props.d';
import type { VerifyProps, verifyEnd } from '../types/props';
export declare class Verify {
    #private;
    [key: string]: any;
    root: Signal<any>[0];
    component: Signal<boolean>[0];
    componentName: Signal<string>[0];
    width: Signal<number>[0];
    height: Signal<number>[0];
    image: Signal<string>[0];
    loading: Signal<boolean>[0];
    verifyX: Signal<number>[0];
    verifyY: Signal<number>[0];
    slideLabel: Signal<string>[0];
    deviation: Signal<number>[0];
    trigger: Signal<TriggerType>[0];
    verifyEnd: verifyEnd | undefined;
    constructor(props: VerifyProps);
    updateSlide: (props: {
        verifyX: number;
        verifyY: number;
        width: number;
        height: number;
        image: string;
    }) => void;
    setLoading: (loading: boolean) => void;
    setLabel: (label: string) => void;
}
export default Verify;
