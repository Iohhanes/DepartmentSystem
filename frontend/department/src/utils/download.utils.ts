import axios from "./department-api";

export const download = () => {
    axios.request({url: "/students/report", method: "POST", responseType: "blob"})
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = "students.docx";
            link.click();
        })
        .catch(error => console.log(error));
}