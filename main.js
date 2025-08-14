const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal() {
    this.openModal = (option = {}) => {
        const { templateId } = option;
        const template = $(`#${templateId}`);

        if (!template) {
            console.error(`#${templateId} does not exist`);
            return;
        }

        const content = template.content.cloneNode(true);

        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop ";

        const container = document.createElement("div");
        container.className = "modal-container";

        const closeBtn = document.createElement("button");
        closeBtn.className = "modal-close";
        closeBtn.innerHTML = "&times;";

        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        // Append content and elements
        modalContent.append(content);
        container.append(closeBtn, modalContent);
        backdrop.append(container);
        document.body.append(backdrop);

        setTimeout(() => {
            backdrop.classList.add("show");
        }, 0);

        // Attack event listener
        closeBtn.onclick = () => this.closeModal(backdrop);

        backdrop.onclick = (e) => {
            if (e.target === backdrop) {
                this.closeModal(backdrop);
            }
        };
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeModal(backdrop);
            }
        });
    };

    this.closeModal = (modalElement) => {
        modalElement.classList.remove("show");
        modalElement.ontransitionend = () => {
            modalElement.remove();
        };
    };
}

const modal = new Modal();
$("#open-modal").onclick = () => {
    modal.openModal({
        templateId: "modal",
    });
};
