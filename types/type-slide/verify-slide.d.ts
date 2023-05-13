import { TriggerType } from '../../types/props.d';
export declare const VerifySlide: (props: {
    ref: any;
    width: number;
    height: number;
    update: (x: number) => void;
    end: (x: number, d: number) => void;
    trigger: TriggerType | undefined;
    loading: boolean;
    disabled: boolean;
    slideLabel: string;
    children: any;
}) => import("solid-js").JSX.Element;
