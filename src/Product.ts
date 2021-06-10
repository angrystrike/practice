export default interface Product {
    _id: string;  
    name: string;  
    price: number;
    color: string;
    transmission: string; 
    engine: string; 
    description: string;
    image: string;
    // @prop({ ref: Category }, WhatIsIt.ARRAY)
    // public categories: mongoose.Types.Array<Category>

    // @prop({ ref: User })
    // public user: User

    // @prop({ type: () => Review })
    // public reviews: Review[];
}

