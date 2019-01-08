# time-line
A timeline webcomponent based on the [CodyHouse vertical-timeline](https://github.com/CodyHouse/vertical-timeline).

## Disclaimer
As [HTML Import](https://developer.mozilla.org/en-US/docs/Web/Web_Components/HTML_Imports) is still not well implemented in browsers ([and will perhaps never be...](https://hacks.mozilla.org/2015/06/the-state-of-web-components)), this starter kit doesn't use this API. Instead, it's the JavaScript bundle that has to be loaded in the page to manage the WebComp.
For the sack of separation of concern, at dev step, we still have the html and the CSS (SCSS) files, but they are loaded in the JS by Webpack.

## Polyfill
To be supported crossbrowser, you'll need some polyfills that are commented out by default in the index.html file.
Just remove the comments to use the polyfill in dev mode.
If you need the polyfill for your application, you'll have to insert it manually with your other scripts.

- [ShadyDOM](https://github.com/webcomponents/shadydom) : ShadowDOM V1 shim
- [document-register-element](https://github.com/WebReflection/document-register-element) : A stand-alone working lightweight version of the W3C Custom Elements specification
- [custom-elements](https://github.com/webcomponents/custom-elements) : is still a work in progress but will be the official custom-element polyfill

Specify the extended tagname in the definition of the custom element like

```customElements.define('my-component', MyComponent, {extends: 'input'});```

