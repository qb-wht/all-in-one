---
to: "<%= model ? `${absPath}/${h.changeCase.camel(layerName)}/model/${h.changeCase.camel(layerName)}.ts` : null %>"
---
import {create} from 'zustand';

export interface <%= h.changeCase.pascal(layerName) %>State {
  value: string;
  changeValue: (value: string) => void;
}

export const use<%= h.changeCase.pascal(layerName) %>Store = create<<%= h.changeCase.pascal(layerName) %>State>((set) => ({
  value: '',
  changeValue: (value) => set(() => ({value: value})),
}));