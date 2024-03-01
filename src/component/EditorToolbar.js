import React from "react"
import { Quill } from "react-quill"
import axios from "axios";


const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
)

// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo()
}
function redoChange() {
    this.quill.history.redo()
}
function quill_img_handler() {
    let fileInput = this.container.querySelector('input.ql-image[type=file]');

    if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            const range = this.quill.getSelection(true);

            if (!files || !files.length) {
                // console.log('No files selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', files[0]);

            this.quill.enable(false);

            axios
                .post('https://api.mudofaa.uz:8080/api/v1/uploadFile', formData,{
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                } )

                .then(response => {
                    // console.log(response.data)
                    this.quill.enable(true);
                    this.quill.editor.insertEmbed(range.index, 'image', `https://api.mudofaa.uz:8080/api/v1${response.data.downloadUri}`);
                    this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
                    fileInput.value = '';
                })
                .catch(error => {
                    // console.log('quill image upload failed');
                    // console.log(error);
                    this.quill.enable(true);
                });
        });
        this.container.appendChild(fileInput);
    }
    fileInput.click();
}


// Add sizes to whitelist and register them
const Size = Quill.import("formats/size")
Size.whitelist = ["extra-small", "small", "medium", "large"]
Quill.register(Size, true)

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font")
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
]
Quill.register(Font, true)

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            undo: undoChange,
            redo: redoChange,
            image:quill_img_handler,
        }
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
}

// Formats objects for setting up the Quill editor
export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
]

// Quill Toolbar component
export const QuillToolbar = () => (
    <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="small">Kichik </option>
        <option value="medium">O‘rtacha </option>
        <option value="large">Katta </option>
      </select>
    </span>
        <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
        <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
        <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
    </span>
        <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
        <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
    </span>
        <span className="ql-formats">
      <button className="ql-clean" />
    </span>
        <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
    </div>
)

export default QuillToolbar