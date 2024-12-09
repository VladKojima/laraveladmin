export class Receipt {
    id;
    payment_id;
    receipt_number;
    amount;
    issued_at;
    tax_amount;
    payment_method;
    pdf_url;
    status;

    constructor(model) {
        this.id = model.id;
        this.payment_id = model.payment_id;
        this.receipt_number = model.receipt_number;
        this.amount = model.amount;
        this.issued_at = model.issued_at;
        this.tax_amount = model.tax_amount;
        this.pdf_url = model.pdf_url;
    }
}