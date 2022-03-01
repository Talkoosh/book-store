export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <h1>{{book.title}}</h1>
            <h5>Price: {{currencyType}}</h5>
            <img class="book-preview-img" :src="book.thumbnail">
        </div>
    `,
    computed: {
        currencyType(){
            // switch(this.book.listPrice.currencyCode){
            //     case 'ILS':
            //         return '₪';
            //     case 'USD':
            //         return '$'
            //     default: 
            //         return '€'
            // }
            return new Intl.NumberFormat(this.book.language, { style: 'currency', currency: this.book.listPrice.currencyCode}).format(this.book.listPrice.amount);
        }
    }
}