const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal() {
    this.openModal = (option = {}) => {
        const { templateId, allowBackDropClose = true } = option;
        const template = $(`#${templateId}`);

        if (!template) {
            console.error(`#${templateId} does not exist`);
            return;
        }

        const content = template.content.cloneNode(true);

        // Create modal elements
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

        if (allowBackDropClose) {
            backdrop.onclick = (e) => {
                if (e.target === backdrop) {
                    this.closeModal(backdrop);
                }
            };
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeModal(backdrop);
            }
        });

        // Disable scrolling
        document.body.classList.add("no-scroll");

        return backdrop;
    };

    this.closeModal = (modalElement) => {
        modalElement.classList.remove("show");
        modalElement.ontransitionend = () => {
            modalElement.remove();

            // Disable scrolling
            document.body.classList.remove("no-scroll");
        };
    };
}

const modal = new Modal();
$("#open-modal-1").onclick = () => {
    const modalElement = modal.openModal({
        templateId: "modal-1",
    });

    const img = modalElement.querySelector("img");
    console.log(img);
};
$("#open-modal-2").onclick = () => {
    const modalElement = modal.openModal({
        templateId: "modal-2",
        allowBackDropClose: false,
    });

    const form = modalElement.querySelector("#login-form");
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = {
                email: $("#email").value.trim(),
                password: $("#password").value.trim(),
            };

            console.log(formData);
        };
    }
};
