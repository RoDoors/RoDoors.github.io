class NavBar extends HTMLElement {
    // we never need more than one nav so this is fine
    wrapper;
    logo;
    navBurger;
    burgerMenu;
    nav;

    constructor() {
        super();
    }

    render() {
        // wrapper
        if (!this.wrapper) {
            this.wrapper = document.createElement('div');
            this.wrapper.className = `
                p-4 
                sticky 
                top-0
                flex 
                justify-between 
                max-h-14 
                bg-zinc-300 
                text-slate-950 
                dark:bg-zinc-900 
                dark:text-slate-50 
            `.replace(/ /g, '').replace(/\n/g, ' ').trim();
        }
        // logo
        if (!this.logo) {
            this.logo = document.createElement('a');
            this.logo.href = '/';
            this.logo.className = 'text-lg';
            this.logo.style.fontFamily = "'Lilita One', cursive";
        }
        // other nav
        if (!this.navBurger) {
            this.navBurger = document.createElement('nav');
            this.navBurger.className = 'md:hidden';
        }
        // burger menu button
        if (!this.burgerMenu) {
            this.burgerMenu = document.createElement('a');
            this.burgerMenu.href = '#';
            this.burgerMenu.textContent = 'W.I.P';
            this.burgerMenu.className = 'btn';
        }
        // nav
        if (!this.nav) {
            this.nav = document.createElement('nav');
            this.nav.className = 'hidden md:flex';
            this.nav.style.flexWrap = 'wrap';
            this.nav.style.alignContent = 'center';
            
            [...this.children].forEach((element) => {
                this.nav.appendChild(element);
            });
        }
        // attribute stuff
        this.logo.textContent = this.hasAttribute('logo-name') ? this.getAttribute('logo-name') : 'Logo';
        this.nav.style.gap = this.hasAttribute('gap') ? this.getAttribute('gap') : '0.25rem';
        // dont need to do this all the time but idc
        this.wrapper.appendChild(this.logo);
        this.wrapper.appendChild(this.navBurger);
        this.navBurger.appendChild(this.burgerMenu);
        this.wrapper.appendChild(this.nav);
        this.appendChild(this.wrapper);
    }

    connectedCallback() {
        // I have a setTimeout because the navbar isnt fully parsed yet when this method gets called
        // the setTimeout makes sure it happens after its parsed unsure why or how?
        // it just works
        setTimeout(this.render.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // this for some reason gets called before connectedCallback
        // and it was causing issues because the navbar wasnt fully parsed yet
        // the setTimeout makes sure it happens after its parsed unsure why or how?
        // it just works
        setTimeout(this.render.bind(this));
    }

    // observe attributes 'logo-name', 'gap'
    static get observedAttributes() {
        return ['logo-name', 'gap'];
    }
}

class ScreenshotsElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    render(screenshots) {
        if (!screenshots) {
            return;
        }

        let width = 200;
        let height = 200;

        if (this.hasAttribute('width')) {
            width = this.getAttribute('width');
        }
        
        if (this.hasAttribute('height')) {
            height = this.getAttribute('height');
        }

        let child;
        while ((child = screenshots.firstChild)) {
            child.remove();
        }

        if (this.hasAttribute('srcs')) {
            const srcsText = this.getAttribute('srcs').replace(/\s/g, '');

            try {
                const srcs = JSON.parse(srcsText);
                
                srcs.forEach(src => {
                    const element = document.createElement('img');
                    element.src = src;
                    element.width = width;
                    element.height = height;
                    screenshots.appendChild(element);
                });
            } catch (_) {
            }
        }
    }

    connectedCallback() {
        const screenshots = document.createElement('div');
        screenshots.className = 'screenshots grid gap-4 grid-cols-2 max-w-4xl';
        this.render(screenshots);
        const styles = document.createElement('style');
        styles.innerHTML = `.screenshots img {
            aspect-ratio: 4/2;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border-style: solid;
            border-width: 3px;
            border-color: black;
        }
        
        .screenshots {
            max-width: 56rem;
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(2, minmax(0, 0.45fr));
            justify-content: center;
        }`;
        this.shadowRoot.appendChild(styles);
        this.shadowRoot.appendChild(screenshots);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render(this.shadowRoot.querySelector('.screenshots'));
    }

    static get observedAttributes() {
        return ['srcs', 'width', 'height'];
    }
}

// register NavBar
customElements.define('nav-bar', NavBar);
// register screenshots
customElements.define('gameplay-screenshots', ScreenshotsElement);