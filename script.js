class Tile{
        constructor(id,arr,i,j){
        this.ID=id;
        this.dir=arr; // L R T B
         this.ele=document.createElement('div');
        this.ele.classList.add("tile");
        this.ele.id=this.ID
        const [L,R,T,B]=this.dir;
        this.x=i;
        this.y=j;
        this.ele.style.width=tileSize+"px";
       this.ele.style.height=tileSize+"px";

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
const tileArray=[];

const tileSize=50;


for(let i=0;i<sqSize;i++){
    for(let j=0;j<sqSize;j++){
        let t=new Tile(sqSize*i+j,mazeMap[sqSize*i+j],i,j)
        sq.appendChild(t.getElement())
        tileArray.push(t);
    }
}
console.log(sq);


sq.style.width=(sqSize*tileSize)+"px";
sq.style.height=(sqSize*tileSize)+"px";

let dir=[[0,-1],[-1,0]]
tileArray.forEach(element => {
    let x=element.x;
    let y=element.y;
    const [L,R,T,B]=element.dir;
    if(x>0){
        if(T){
            element.ele.style.borderTop="none";
        }
    }
    if(y>0){
        if(L){
            element.ele.style.borderLeft="none";
        }
    }
});


//-----------Creating RED------------
const red=document.createElement('div');
red.classList.add("redIt");
tileArray[start1].ele.appendChild(red);

   

tileArray[22].ele.innerHTML="<div class=\"endTile\">END</div>";

hasWon=(current)=>{
    if(current==end1){
        alert("You won!");
        this.location.reload();
        return true;
    }
    return false;
}
//EVENT-LOOP
let current=start1;
document.addEventListener('keydown',function(e){
    const [L,R,T,B]=tileArray[current].dir;
    switch(e.key){
        case 'ArrowUp': 
            if(current-sqSize>=0 && !T){
                red.remove();
                current-=sqSize;
                if(hasWon(current)){return};
                tileArray[current].ele.appendChild(red);
            }
            break;
        case 'ArrowDown': 
            if(current+sqSize<sqSize*sqSize && !B){
                red.remove();
                current+=sqSize;
                if(hasWon(current)){return};
                tileArray[current].ele.appendChild(red);
            }
            break;
        case 'ArrowLeft':
            if(current-1>=0 && !L){
                red.remove();
                current-=1
                if(hasWon(current)){return};
                tileArray[current].ele.appendChild(red);
            } 
            break;
        case 'ArrowRight':
            if(current+1<sqSize*sqSize && !R){
                red.remove();
                current+=1
                if(hasWon(current)){return};
                tileArray[current].ele.appendChild(red);
            }
            break;
        }
});