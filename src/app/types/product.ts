export interface Productss {
    _id?: string;
    name: string;
    shotDescription: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    categoryId: string;
    brandId: string;
    isFeatured:boolean;
    isNewProduct:boolean;
    
}
