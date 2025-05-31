
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

        this.ele.style.borderLeft= L ? "4px solid black": "none";
        this.ele.style.borderRight= R ? "4px solid black": "none";
        this.ele.style.borderTop= T ? "4px solid black": "none";
        this.ele.style.borderBottom= B ? "4px solid black": "none";

        this.visited=false;
        
    }
    getElement(){
        return this.ele;
    }
}
const arr=[[start1,end1,mazeMap1,tileSize1],[start2,end2,mazeMap2,tileSize2]]

const rIdx=Math.floor(Math.random()*arr.length);
const [start,end,mazeMap,tileSize]=arr[rIdx]
console.log(mazeMap);

const sqSize=Math.sqrt(Math.max(...Object.keys(mazeMap).map(Number))+1);
console.log(sqSize);

const sq=document.getElementById("square");
console.log(sq);
const tileArray=[];



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
tileArray[start].ele.appendChild(red);
tileArray[start].ele.visited=true;

   

tileArray[end].ele.innerHTML="<div class=\"endTile\">END</div>";

hasWon=(current)=>{
    if(current==end){
        alert("You won!");
        this.location.reload();
        return true;
    }
    return false;
}

function moveUp(current, T){
    var temp=current;
    if(current-sqSize>=0 && !T){
        red.remove();
        current-=sqSize;
        if(tileArray[current].ele.classList.contains("path")){
            tileArray[temp].ele.classList.remove("path")
        }
        if(hasWon(current)){return};
        tileArray[current].ele.appendChild(red);
        tileArray[current].ele.classList.add("path");
    }
    return current;
}

function moveLeft(current, L){
    var temp=current;
    if(current-1>=0 && !L){
        red.remove();
        current-=1
        if(tileArray[current].ele.classList.contains("path")){
            tileArray[temp].ele.classList.remove("path")
        }
        if(hasWon(current)){return};
        tileArray[current].ele.appendChild(red);
        tileArray[current].ele.classList.add("path");
    } 
    return current;
}

function moveDown(current, B){
    var temp=current;
    if(current+sqSize<sqSize*sqSize && !B){
        red.remove();
        current+=sqSize;
        if(tileArray[current].ele.classList.contains("path")){
            tileArray[temp].ele.classList.remove("path")
        }
        if(hasWon(current)){return};
        tileArray[current].ele.appendChild(red);
        tileArray[current].ele.classList.add("path");
    }
    return current;
}

function moveRight(current, R){
    var temp=current;
    if(current+1<sqSize*sqSize && !R){
        red.remove();
        current+=1
        if(tileArray[current].ele.classList.contains("path")){
            tileArray[temp].ele.classList.remove("path")
        }
        if(hasWon(current)){return};
        tileArray[current].ele.appendChild(red);
        tileArray[current].ele.classList.add("path");
    }
    return current;
}
//EVENT-LOOP
let current=start;
tileArray[start].ele.classList.add("imp_path","path");
document.addEventListener('keydown',function(e){
    const [L,R,T,B]=tileArray[current].dir;
    switch(e.key){
        case 'ArrowUp': 
            current=moveUp(current, T);
            break;
        case 'ArrowDown': 
            current=moveDown(current, B);
            break;
        case 'ArrowLeft':
            current=moveLeft(current, L);
            break;
        case 'ArrowRight':
            current=moveRight(current, R);
            break;
        }
});

let touchX, touchY;

document.addEventListener('touchstart', function (e) {
    e.stopPropagation()
    e.preventDefault()
    const touch = e.changedTouches[0]
    touchX = touch.screenX
    touchY = touch.screenY
});

document.addEventListener('touchend', function (e) {
    e.stopPropagation()
    e.preventDefault()
    const [L,R,T,B]=tileArray[current].dir;
    const touch = e.changedTouches[0]
    const x1 = touch.screenX
    const y1 = touch.screenY
    const x0 = touchX
    const y0 = touchY
    const dx = x1 - x0
    const dy = y0 - y1
    const angle = Math.atan2(dy, dx) * 180 / Math.PI
    console.log(dx, dy, angle)
    if(angle >= -45 && angle <= 45)
        current=moveRight(current, R)
    else if(angle >= 45 && angle <= 135)
        current=moveUp(current, T)
    else if(angle >= 135 || angle <= -135)
        current=moveLeft(current, L)
    else if(angle >= -135 && angle <= -45)
        current=moveDown(current, B)
});