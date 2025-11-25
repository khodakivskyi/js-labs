class Tab {
    constructor(container) {
        this.container = container;

        this.tabButtons = document.createElement('div');
        this.tabButtons.classList.add('tab-buttons');
        this.tabButtons.style.display = 'flex';
        this.tabButtons.style.gap = '5px';
        this.container.appendChild(this.tabButtons);

        this.tabContents = document.createElement('div');
        this.tabContents.classList.add('tab-contents');
        this.tabContents.style.border = '1px solid #ccc';
        this.tabContents.style.padding = '10px';
        this.tabContents.style.marginTop = '5px';
        this.container.appendChild(this.tabContents);

        this.tabs = [];
        this.activeIndex = 0;
    }

    addTab(title, content) {
        const index = this.tabs.length;

        const button = document.createElement('button');
        button.textContent = title;
        button.style.padding = '5px 10px';
        button.style.cursor = 'pointer';
        button.addEventListener('click', () => this.switchTab(index));

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = content;
        contentDiv.style.display = 'none';

        this.tabButtons.appendChild(button);
        this.tabContents.appendChild(contentDiv);

        this.tabs.push({ button, content: contentDiv });

        if (this.tabs.length === 1) {
            this.switchTab(0);
        }
    }

    switchTab(index) {
        this.tabs.forEach((tab, i) => {
            if (i === index) {
                tab.content.style.display = 'block';
                tab.button.style.backgroundColor = '#007BFF';
                tab.button.style.color = 'white';
            } else {
                tab.content.style.display = 'none';
                tab.button.style.backgroundColor = '';
                tab.button.style.color = '';
            }
        });
        this.activeIndex = index;
    }
}


const container = document.getElementById('tab-container');
const tabs = new Tab(container);

tabs.addTab("Вкладка 1", "<p>Контент першої вкладки</p>");
tabs.addTab("Вкладка 2", "<p>Контент другої вкладки</p>");
tabs.addTab("Вкладка 3", "<p>Контент третьої вкладки</p>");
