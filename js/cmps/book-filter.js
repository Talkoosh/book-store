export default {
    template: `
        <section class="filter">
            <div class="filter-title">
                <input  type="text" name="filter-title-input" placeholder="Book Title" @input="setFilter" v-model="byName" > 
            </div>
            <div class="filter-price">
                <input type="number" name="filter-min-input" placeholder="Min Price" @input="setFilter" v-model="fromPrice"> 
                <input type="number" name="filter-max-input" placeholder="Max Price" @input="setFilter" v-model="toPrice">  
            </div>
        </section>
    `,
    data() {
        return {
            byName: '',
            fromPrice: -Infinity,
            toPrice: Infinity
        }
    },
    methods: {
        setFilter(){
            if(!this.fromPrice) this.fromPrice = -Infinity;
            if(!this.toPrice) this.toPrice = Infinity;
            this.$emit('filtered', {
                byName: this.byName,
                fromPrice: this.fromPrice,
                toPrice: this.toPrice
            })
        }   
    }
}