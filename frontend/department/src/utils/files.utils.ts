import axios from "./department-api";

export const downloadDocument = (url: string, fileName: string, requestData: any, onSuccess: () => void, onError: () => void) => {
    axios.request({url: url, method: "POST", responseType: "blob", data: requestData})
        .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
                onSuccess();
            }
        )
        .catch(error => {
                console.log(error)
                onError();
            }
        );
}

export const printDocument = (url: string, requestData: any, onSuccess: () => void, onError: () => void) => {
    axios.request({url: url, method: "POST", responseType: "blob", data: requestData})
        .then(response => {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = window.URL.createObjectURL(response.data);
                document.body.appendChild(iframe);
                iframe.contentWindow?.print();
                onSuccess();
            }
        )
        .catch(error => {
                console.log(error)
                onError();
            }
        );
}