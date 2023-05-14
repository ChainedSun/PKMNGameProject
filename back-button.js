const styleSheetPath = "../back-button.css"

class BackButton {
    constructor(title, elementValue, backLink) {
      this.title = title;
      this.container = this.createContainer();
      this.svg = this.createSVG();
      this.container.appendChild(this.svg);
      this.renderTo(elementValue)
      this.addStyle()
      this.registerClick(backLink)
    }
  
    createContainer() {
      const container = document.createElement('div');
      container.id = 'arrowContainer';
      container.title = this.title;
      return container;
    }
  
    createSVG() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('svg-1');
      svg.setAttribute('width', '64');
      svg.setAttribute('height', '64');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
  
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.classList.add('path-1');
      path1.setAttribute('d', 'M11.9481 14.8285L10.5339 16.2427L6.29126 12L10.5339 7.7574L11.9481 9.17161L10.1197 11H17.6568V13H10.1197L11.9481 14.8285');
      path1.setAttribute('fill', 'currentColor');
  
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.classList.add('path-2');
      path2.setAttribute('fill-rule', 'evenodd');
      path2.setAttribute('clip-rule', 'evenodd');
      path2.setAttribute('d', 'M23 19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19ZM19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z');
      path2.setAttribute('fill', 'currentColor');
  
      svg.appendChild(path1);
      svg.appendChild(path2);
  
      return svg;
    }
  
    renderTo(elementId) {
        let containerElement;

        if (elementId instanceof HTMLElement) {
            containerElement = elementId;
        } else if (typeof elementId === 'string') {
            containerElement = document.getElementById(elementId);
        } else {
            throw new Error('Invalid parameter. Expected an HTML element or element ID string.');
        }
        if (containerElement) {
        containerElement.appendChild(this.container);
        }
        if (containerElement.hasChildNodes) {
        containerElement.insertBefore(this.container, containerElement.firstChild)
        }
    }

    addStyle() {
        const head = document.head || document.getElementById("head")[0]
        const link = document.createElement("link")
    
        link.rel = "stylesheet"
        link.href = styleSheetPath
    
        head.appendChild(link)
    }

    registerClick(loc) {
        this.container.addEventListener("click", () => {
            window.location.href = loc
          })
    }
    
}


  