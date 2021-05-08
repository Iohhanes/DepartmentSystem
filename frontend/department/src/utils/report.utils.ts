import axios from "./department-api";

export const downloadReport = (prefix: string, fileName: string, requestData: any, onSetDownloadStatus: () => void) => {
    axios.request({url: `/${prefix}/report`, method: "POST", responseType: "blob", data: requestData})
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
                onSetDownloadStatus();
            }
        );
}