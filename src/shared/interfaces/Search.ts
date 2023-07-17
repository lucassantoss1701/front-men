export interface Transaction {
    id: string;   
    date: string;
    valence: string;
    type_of_transaction: string;
    operator_name: string;  
}

export interface ResultOfTransaction{
    total: string;
    period_total: string;
    transactions: Transaction[];
}


  