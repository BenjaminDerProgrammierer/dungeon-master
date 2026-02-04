export default class Dialog {
    show(container, content, title = "Dialog") {
        this.ref = document.createElement('dialog');
        this.ref.classList.add('dialog');
        container.appendChild(this.ref);

        const head = document.createElement('div');
        head.classList.add('dialog-head');
        this.ref.appendChild(head);
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        head.appendChild(titleElement);

        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.addEventListener('click', () => this.close());
        head.appendChild(closeButton);
        
        content.classList.add('dialog-content');
        this.ref.appendChild(content);
        this.ref.showModal();
    }

    close() {
        this.ref.remove();
    }
}
