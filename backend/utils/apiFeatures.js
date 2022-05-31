class ApiFeature{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }
    search(){
        const keyword=this.queryStr.keyword 
        ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:'i',
            }
        }
        : {};
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const filterQuery = {...this.queryStr};
        const removeStr = ["keyward","page","limit"]
        removeStr.forEach((elem)=>{delete filterQuery[elem]});
        
        // filter for price
        let filterQueryStr=JSON.stringify(filterQuery);
        filterQueryStr = filterQueryStr.replace(/\b(gt|gte|lt|lte)\b/g,e=>`$${e}`)

        this.query = this.query.find(JSON.parse(filterQueryStr));
        return this;
    }
    pagination(resultPerPage){
        const currentPage = this.queryStr.page || 1;
        const skip = resultPerPage*(currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}
module.exports = ApiFeature;