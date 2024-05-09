import Hls from 'hls.js';
import fastpixMetrix from 'metrix-core';

class EventTarget {
    addEventListener() { }
    removeEventListener() { }
    dispatchEvent(_event: Event) {
        return true;
    }
}

if (typeof DocumentFragment === 'undefined') {
    class DocumentFragment extends EventTarget { }
    globalThis.DocumentFragment = DocumentFragment;
}

class HTMLElement extends EventTarget { }
class HTMLVideoElement extends EventTarget { }

const customElements: CustomElementRegistry = {
    get(_name: string) {
        return undefined;
    },
    define(_name, _constructor, _options) { },
    upgrade(_root) { },
    whenDefined(_name) {
        return Promise.resolve(HTMLElement as unknown as CustomElementConstructor);
    },
};

class EventEmitter {
    eventDetail;
    get detail() {
        return this.eventDetail;
    }
    constructor(typeArg: string, eventInitDict: CustomEventInit = {}) {
        this.eventDetail = eventInitDict?.detail;
    }
    initCustomEvent() { }
}

function createElement(_tagName: string, _options?: ElementCreationOptions): HTMLElement {
    return new HTMLElement();
}

const insteadGlobal = {
    document: {
        createElement,
    },
    DocumentFragment,
    customElements,
    CustomEvent: EventEmitter,
    EventTarget,
    HTMLElement,
    HTMLVideoElement,
};

const isServer = typeof window === 'undefined' || typeof globalThis.customElements === 'undefined';
type GlobalThis = typeof globalThis;
const universeObj: GlobalThis = (isServer ? insteadGlobal : globalThis) as GlobalThis;
const globalDoc: Document = (isServer ? insteadGlobal.document : globalThis.document) as Document;

let windowObject = universeObj
let documentObject = globalDoc


class customElement extends windowObject.HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Create a paragraph element
        const paragraph = documentObject.createElement('p');
        paragraph.textContent = "This above all: to thine own self be true    ----Hamlet"

        // Append the paragraph to the shadow root
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(paragraph);
        } else {
            console.error('Shadow root is null.');
        }
    }
}
       
if (!windowObject.customElements.get("test-element")) {
    windowObject.customElements.define("test-element", customElement);
}
