class Tile{
    constructor(id,arr){
        this.ID=id;
        this.dir=arr; // L R T B
        this.ele=document.createElement('div');
        this.ele.classList.add("tile");
        this.ele.id=this.ID
        const [L,R,T,B]=this.dir;

        this.ele.style.borderLeft= L ? "2px solid black": "none";
        this.ele.style.borderRight= R ? "2px solid black": "none";
        this.ele.style.borderTop= T ? "2px solid black": "none";
        this.ele.style.borderBottom= B ? "2px solid black": "none";

    }
    getElement(){
        return this.ele;
    }
}
console.log(mazeMap);

const sqSize=Math.sqrt(Math.max(...Object.keys(mazeMap).map(Number))+1);
console.log(sqSize);

const sq=document.getElementById("square");
console.log(sq);
for(let i=0;i<sqSize;i++){
    for(let j=0;j<sqSize;j++){
        let t=new Tile(sqSize*i+j,mazeMap[sqSize*i+j])
        sq.appendChild(t.getElement())
    }
}
console.log(sq);

sq.style.width=(sqSize*20)+"px";
sq.style.height=(sqSize*20)+"px";
