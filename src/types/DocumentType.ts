export default class DocumentType {

    static DNI: number = 1;
    static RUC: number = 2;

    public idDocumentType: number = 0;
    public number: string = "";
    public description: string = "";
    public abbreviation: string = "";

    constructor() {}

    static toDocumentTypes(data: any[]): DocumentType[]
    {
        const documentTypes: DocumentType[] = [];

        data.forEach((item: any) => {

            const documentType = new DocumentType();

            documentType.idDocumentType = item['idDocumentType'];
            documentType.number         = item['number'];
            documentType.description    = item['description'];
            documentType.abbreviation   = item['abbreviation'];

            documentTypes.push(documentType);
        });

        return documentTypes;
    }
}