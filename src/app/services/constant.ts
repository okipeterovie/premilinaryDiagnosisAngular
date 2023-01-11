import { HttpHeaders } from "@angular/common/http";

export const utility = {
    allHeader: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }),
    jsonHeader: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'text/json'
    }),

    pdfHeader: new HttpHeaders({
        'Content-Type': 'application/pdf',
        'Accept': '*/*'
    }),
    xmlHeader: new HttpHeaders({
        'Content-Type': 'application/xml',
        'Accept': 'text/XML'
    }),
    textHeader: new HttpHeaders({
        'Content-Type': 'application/text',
        'Accept': 'text/plain'
    }),
    fileUploadHeader: new HttpHeaders({
        'Accept': '*/*'
    })

}