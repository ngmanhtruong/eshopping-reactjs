export default function CountingProducts(keyword,data){
    let count = 0;
    data.map(data=>{
        if (data.title.includes(keyword))
            count++;
    })
    return count;
}