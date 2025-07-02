---
to: "<%= model ? `${absPath}/${h.changeCase.camel(layerName)}/model/index.ts` : null %>"
---
export {use<%= h.changeCase.pascal(layerName) %>Store} from './model/<%= h.changeCase.camel(layerName) %>';