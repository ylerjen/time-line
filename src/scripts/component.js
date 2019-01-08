import componentDom from '../templates/component.html';
import componentStyles from '../styles/component.scss';

function createTemplate() {    
    const tplWrapper = document.createElement('template');    
    tplWrapper.innerHTML = `<style>${componentStyles}</style>${componentDom}`;
    return tplWrapper;
}

const eventsAttributeName = 'data';

/**
 * The timeline component displays a list of events with a vertical timeline layout
 */
export class TimeLine extends HTMLElement {
    /**
     * @static
     * Returns a list of observed attributes
     */
    static get observedAttributes() { return [eventsAttributeName]; }

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
        if (attrName === eventsAttributeName) {
            let eventList;
            if (typeof newVal === 'string') {
                try {
                    eventList = JSON.parse(newVal);
                } catch(e) {
                    // webcomponent should fail silently
                }
            }
            if (Array.isArray(eventList)) {
                this.setEvents(eventList);
            }
        }
    }

    setEvents(eventList) {
        this.emptyTimelineView();
        this._events = eventList;
        eventList.forEach(event => {
            event.date = new Date(event.date);
            this.shadowRoot.querySelector('.timeline__container').appendChild(this.createBlock(event));
        });
    }

    emptyTimelineView() {
        this.shadowRoot.querySelector('.timeline__container').innerHTML = "";
    }

    /**
     * Create the block from the content
     * @param {object} data - is the data describing an event in the timeline
     *     @param {date} data.date - the date of the event.
     *     @param {string} data.title - the title of the event.
     *     @param {string} data.icon - the icon for the event.
     *     @param {string} data.bgColor - the pill's background-color for the event.
     *     @param {string} data.summary - the summary of the event.
     *     @param {string} [data.link] - the url to the detail of the event.
     */
    createBlock(data) {
        const content = document.importNode(createTemplate().content, true);
        const block = content.querySelector('.timeline__block');        
        block.querySelector('.timeline__date').innerHTML = data.date.toLocaleDateString();
        block.querySelector('.timeline__title').innerHTML = data.title;
        block.querySelector('.timeline__description').innerHTML = data.summary;
        const imgBlock = block.querySelector('.timeline__pill');
        imgBlock.innerHTML = data.icon || '&#9787;'
        imgBlock.style.backgroundColor = '#c71cf5';

        const btn = block.querySelector('.timeline__read-more');
        if (data.link) {
            btn.innerHTML = 'Read more...';
            btn.setAttribute('href', data.link);
        } else {
            btn.parentNode.removeChild(btn);
        }

        return block;
    }
}
  
export function defineCustomElement() {
    // define the web component for a standard HTMLElement extension
    customElements.define('time-line', TimeLine);
}