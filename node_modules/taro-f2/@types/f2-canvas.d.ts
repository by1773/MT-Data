import {ComponentClass, ComponentState} from 'react'

export interface F2CanvasProps {
  onCanvasInit: (canvas:any, width: number, height: number, $scope: any) => any,
}

interface F2CanvasComponentClass<P = {}, S = ComponentState> extends ComponentClass<P, S> {
  fixF2: (f2: any) => any;
}


declare const F2Canvas: F2CanvasComponentClass<F2CanvasProps>;

export default F2Canvas

export function fixF2(f2: any): any;

