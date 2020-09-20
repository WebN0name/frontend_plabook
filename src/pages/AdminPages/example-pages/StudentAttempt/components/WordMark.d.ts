import * as React from 'react';
import { OverridableComponent, SimplifiedPropsOf, OverrideProps } from '../OverridableComponent';

export type Variant = 'none' | 'insertion' | 'deletion' | 'substitution' | 'repeat';


export interface WordMarkTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    {
      variant?: Variant;
    };
  defaultComponent: D;
}

declare const WordMark: OverridableComponent<WordMarkTypeMap>;

export type WordMarkProps<
  D extends React.ElementType = WordMarkTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<WordMarkTypeMap<P, D>, D>;

export default WordMark;
