  // function hue(i,j){
    //     i = Math.abs(i-parseInt(dimensions/2));
    //     j = Math.abs(j-parseInt(dimensions/2));
    //     let distance = i > j ? i : j;
    //     if(distance%2 == 0){
    //         distance = (i+j-1)/1.3 - distance/30 + Math.floor(Math.random()*2);
            
    //     }
    //     h = distance*100 + Math.floor(Math.random()*80);
    //     return h;
    // }
    
    let default_h = Math.floor(Math.random()*360);
    let default_l = Math.floor(Math.random()*(100-20)+20);
    let default_s = Math.floor(Math.random()*100);

    let mode_h = Math.floor(Math.random()*5);
    // mode_h = 2;
    function hue(i,j){
        i = Math.abs(i-parseInt(dimensions/2));
        j = Math.abs(j-parseInt(dimensions/2));
        let distance;
        switch(mode_h){
            case 0:
                distance = i > j ? i : j;
                if(distance%2 == 0){
                    distance = (i+j-1)/1.3 - distance/30 + Math.floor(Math.random()*2);
                }
                h = distance*100 + Math.floor(Math.random()*80);
            break;

            case 1:
                h = default_h;
            break;

            case 2:
                distance = i > j ? i : j;
                h = distance*default_h + default_s*3.6;
            break;
            
            case 3:
                distance = i > j ? i : j;
                h = distance%2 == 0 ? default_h : default_h+default_s*3.6;
            break;

            case 4:
                distance = i > j ? j : i;
                h = distance%2 == 0 ? default_h : default_h+default_s*3.6;
            break;


        }
           
        return h;
    }
    let mode_l = Math.floor(Math.random()*3);
    // mode_l = 2;

    let mode_l_0 = mode_l == 0 ? Math.floor(Math.random()*3) : null;
    // let mode_l_0 = 3;
    function lightness(i,j){
        i = Math.abs(i-parseInt(dimensions/2));
        j = Math.abs(j-parseInt(dimensions/2));
        let l;
        let distance;
        switch(mode_l){
            case 0:
                switch(mode_l_0){
                    case 0:
                        distance = i > j ? i : j;
                        distance = (distance/2.5)+.5;
                        break;
                    case 1:
                        distance = i > j ? j : i;
                        distance = (distance/1.3)+0.5;
                        break;
                    case 2:
                        distance = i+j;
                        distance /= 3;
                        break;
                    // case 3:
                    //     distance = Math.abs(i-j)+1;
                    //     distance /= 1.5;
                    //     break;
                }
                l = default_l*distance/2;
                break;
            case 1:
                distance = i > j ? i : j;
                if(distance%2 == 0){
                    distance = (i+j-1)/1.3 - distance/30 + Math.floor(Math.random()*2);
                    
                }
                distance = distance/1.6 + 1;
                l =  distance*22 - Math.floor(Math.random()*(distance+1)*5);
                break;
            case 2:
                distance = i < j ? i : j;
                distance = distance/1.6 + 1;
                l =  distance*50 - Math.floor(Math.random()*(distance+1)*20);
                break;
        }
        l = l >100 ? 100 : l;
        return l;
        
    }
    let mode_s = Math.floor(Math.random()*5);
    // let mode_s = 2;
    let mode_s_23 = (mode_s === 3 || mode_s===2) ?  Math.floor(Math.random()*2) : null;
    function saturation(i,j){
        i = Math.abs(i-parseInt(dimensions/2));
        j = Math.abs(j-parseInt(dimensions/2));
        let distance;
        let s;
        switch(mode_s){
            case 0: 
                distance = distance = i > j ? i : j;
                s = 100-distance**1.5 ;
                break;
            case 1:
                distance = distance = i > j ? i : j;
                s = 100/(distance+1);
                break;
            case 2:
                distance = i > j ? i : j;
                s = mode_s_23 == 0 ? distance%2 != 0 ? 0 : default_s : distance%2 == 0 ? 0 : default_s ;
                break;
            case 3:
                distance = i < j ? i : j;
                s = mode_s_23 == 0 ? distance%2 != 0 ? 0 : default_s : distance%2 == 0 ? 0 : default_s ;
                break;
            case 4:
                s = default_s;
                break;
                
        }
        s = s > 100 ? 100 : s;
        return s;
        
    }
    // for(let i = 0; i < dimensions; i++){
    //     for(let j = 0; j < dimensions; j++){
    //         let div = document.createElement('div');
    //         div.style.position = 'absolute';
    //         div.style.height = size + 'px';
    //         div.style.width =size+'px';
    //         div.style.top = size*i+'px';
    //         div.style.left = size*j+'px';
           
    //         div.style.background = 'hsl('+hue(i,j)+',+'+saturation(i,j)+'%,'+lightness(i,j)+'%)';
    //         document.body.appendChild(div);
    //     }
    // }
    function hslToHex(h, s, l) {
        l = (l>101)?100:l;
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
let size = 30;
let dimensions = 23;
let canvasMode = 1;
let c;
if(canvasMode){
    
    document.write("<canvas id='mycanvas' style='width:"+(size*dimensions)+"px; height:"+(size*dimensions)+"px'></canvas>");
    c = document.getElementById("mycanvas");
    c.width = c.height = size*dimensions;

    let ctx = c.getContext("2d");
    for (let i = 0; i < dimensions; i++) {
        for (let j = 0; j < dimensions; j++) {
            ctx.fillStyle = hslToHex(hue(i,j), saturation(i,j), lightness(i,j));
            ctx.beginPath();
            ctx.rect(j*size, i*size, size, size); 
            ctx.fill();
        }   
    }
}else{
     for(let i = 0; i < dimensions; i++){
        for(let j = 0; j < dimensions; j++){
            let div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.height = size + 'px';
            div.style.width = size+'px';
            div.style.top = size*i+'px';
            div.style.left = size*j+'px';
           
            div.style.background = 'hsl('+hue(i,j)+',+'+saturation(i,j)+'%,'+lightness(i,j)+'%)';
            document.body.appendChild(div);
        }
    }
}
document.write("<br><a id='download'>download</a>");
let a = document.getElementById('download');
let filename = mode_h+"#"+mode_s+"_"+mode_s_23+"#"+mode_l+"_"+mode_l_0+"&"+default_h+"&"+default_s+"&"+default_l;
filename = filename.split("_null").join("");
a.innerText = filename;
a.download = filename + ".png";
a.href = c.toDataURL("image/png", 1.0)//.replace("image/png", "image/octet-stream");
