class SearchFilter {
    constructor() {
        this.text = null;
        this.city = null;
        this.salary = null;
        this.profession = null;
        this.count = 20;
        this.page = 1;
    }
    static byText(text) {
        let filter = new SearchFilter();
        filter.text = text;
        return filter;            
    }
    static byCity(city) {
        let filter = new SearchFilter();
        filter.city = city;
        return filter;            
    }
    static byProfession(profession) {
        let filter = new SearchFilter();
        filter.profession = profession;
        return filter;            
    }
}

export const searchFilter = new SearchFilter();