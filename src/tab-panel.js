(function (window) {

    'use strict';

    var TabPanel = function () {
        this.tabs = [];
        this.tabContainer = null;
        this.currentActive = 0;
    };

    TabPanel.prototype.changeActive = function (e) {
        var newActiveIndex = +e.target.getAttribute("index");
        if (newActiveIndex === this.currentActive) {
            return;
        }
        var tab = this.tabs[this.currentActive];
        tab.title.classList.remove("active");
        tab.elem.classList.remove("active");
        this.currentActive = newActiveIndex;
        tab = this.tabs[this.currentActive];
        tab.title.classList.add("active");
        tab.elem.classList.add("active");
    };
    
    TabPanel.prototype.init = function (child) {

        var children = child.children,
            activeFound = false,
            tabContainer;
        child.classList.add("tab");
        this.child = child;
        this.tabs.length = 0;
        
        for (var i = 0; i < children.length; i++) {
            var elem = children[i];
            if (elem.tagName === 'ARTICLE') {
                elem.classList.add("tabcontent");
                var title = elem.getAttribute("title");
                var li = document.createElement("li");
                li.textContent = title;
                li.classList.add("tabitem");
                li.setAttribute("index", this.tabs.length);
                li.onclick = changeActive.bind(this);
                
                if (!activeFound) {
                    elem.classList.add("active");
                    li.classList.add("active");
                    activeFound = true;
                    this.currentActive = this.tabs.length;
                }
                
                this.tabs.push({title: li, elem: elem});
            } else if (!this.tabContainer && elem.tagName == 'H2') {
                elem.classList.add("tabname");
                tabContainer = document.createElement("ul");
                tabContainer.classList.add("tabcontainer");
                elem.parentElement.insertBefore(tabContainer, elem.nextSibling);
            }
        }
        if (tabContainer) {
            this.tabs.forEach(function (tab) {
                tabContainer.appendChild(tab.title);
            });
            this.tabContainer = tabContainer;
        }
    };
    TabPanel.prototype.destroy = function () {
        this.tabContainer = null;
        this.tabs.length = 0;
    };
    
    var panels = [];
    var tabDemo = function () {
        for(var i = 0; i < document.body.children.length; i++) {
            var child = document.body.children[i];
            if(child.tagName.toLowerCase() != 'section') continue;

            var t = new TabPanel();
            t.init(child);
            panels.push(t);
        }
    };
    window.onload = tabDemo;
    
}(window));