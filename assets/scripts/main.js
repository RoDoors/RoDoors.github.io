class NavBar extends HTMLElement {
    wrapper;
    logo;

    navBurger;
    burgerMenu;

    nav;

    constructor() {
        super();
    }

    render() {
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

        if (!this.logo) {
            this.logo = document.createElement('a');
            this.logo.href = '/';
            this.logo.className = 'text-lg';
            this.logo.style.fontFamily = "'Lilita One', cursive";
        }
        
        if (!this.navBurger) {
            this.navBurger = document.createElement('nav');
            this.navBurger.className = 'md:hidden';
        }
        
        if (!this.burgerMenu) {
            this.burgerMenu = document.createElement('a');
            this.burgerMenu.href = '#';
            this.burgerMenu.textContent = 'W.I.P';
            this.burgerMenu.className = 'btn';
        }
        
        if (!this.nav) {
            this.nav = document.createElement('nav');
            this.nav.className = 'hidden md:flex';
            this.nav.style.flexWrap = 'wrap';
            this.nav.style.alignContent = 'center';
            
            [...this.children].forEach((element) => {
                this.nav.appendChild(element);
            });
        }
        
        this.logo.textContent = this.hasAttribute('logo-name') ? this.getAttribute('logo-name') : 'Logo';
        this.nav.style.gap = this.hasAttribute('gap') ? this.getAttribute('gap') : '0.25rem';
        
        this.wrapper.appendChild(this.logo);
        this.wrapper.appendChild(this.navBurger);
        this.navBurger.appendChild(this.burgerMenu);
        this.wrapper.appendChild(this.nav);

        this.appendChild(this.wrapper);
    }

    connectedCallback() {
        setTimeout(this.render.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        setTimeout(this.render.bind(this));
    }

    static get observedAttributes() {
        return ['logo-name', 'gap'];
    }
}

customElements.define('nav-bar', NavBar);