import axios from "./department-api";

export const downloadDocument = (url: string, fileName: string, requestData: any, onDownloadError: () => void) => {
    axios.request({url: url, method: "POST", responseType: "blob", data: requestData})
        .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
            }
        )
        .catch(error => {
                console.log(error)
                onDownloadError();
            }
        );
}