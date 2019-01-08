import componentDom from './../templates/component.html';
import componentStyles from './../styles/component.scss';

function createTemplate() {    
    const tplWrapper = document.createElement('template');    
    tplWrapper.innerHTML = `<style>${componentStyles}</style>${componentDom}`;
    return tplWrapper;
}

/**
 * TODO jsdoc
 * 
 * @class ChangeMe
 */
export class ChangeMe extends HTMLElement {
    /**
     * @static
     * Returns a list of observed attributes
     */
    static get observedAttributes() { return []; }

    /**
     * Constructor of the class. It's called when an instance of the element is created or upgraded.
     * Useful for initializing state, settings up event listeners, or creating shadow dom.
     * See the spec for restrictions on what you can do in the constructor.
     */
    constructor() {
        super();
        const content = createTemplate().content;
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(content.cloneNode(true));
        this.innerHTML = '<h1>I\'m your Web-Component.</h1><p>Change me in <code>src/scripts/component.js</code></p>';
    }

    /**
     * Called every time the element is inserted into the DOM.
     * Useful for running setup code, such as fetching resources or rendering.
     * Generally, you should try to delay work until this time.
     */
    connectedCallback() {

    }

    /**
     * Called every time the element is removed from the DOM.
     * Useful for running clean up code.
     */
    disconnectedCallback() {

    }

    /**
     * Called when an observed attribute listed in the "static observedAttributes" has been added, removed, updated, or replaced
     * @param {string} attrName - the name of the attribute that changed
     * @param {string} oldVal - the name of the attribute that changed
     * @param {string} newVal - the name of the attribute that changed
     * @see observedAttributes
     */
    attributeChangedCallback(attrName, oldVal, newVal) {

    }

    get dummy() {
        return 'woot';
    }
}
  
export function defineCustomElement() {
    // define the web component for a standard HTMLElement extension
    customElements.define('change-me', ChangeMe);
    
    // but if you extend a specific element like HTMLButtonElement you'll need the following declaration instead.
    // customElements.define('change-me', ChangeMe, {extends: 'button'});
}