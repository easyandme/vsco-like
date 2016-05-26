
    window.document.onload = provia();

    var c = document.getElementById('myCanvas'),
    context = c.getContext('2d'); 
    var output = document.getElementById('myOutput'),
    outputImage = output.getContext('2d'); 
    document.getElementById('dlbtn').disabled = true;

    var img = new Image(); 
    img.onload = function(){ 
        c.width = img.naturalWidth;
        c.height = img.naturalHeight; 
        context.drawImage(img, 0, 0, c.width, c.height);
        c.style.width = '360px';
        c.style.height = 360 * c.height / c.width + 'px'; 
    }
    img.src = 'img/9.jpg'; 

    var img2 = new Image();
  
    img2.onload = function(){ 
        output.width = img2.naturalWidth;
        output.height = img2.naturalHeight;
        outputImage.drawImage(img2, 0, 0, output.width, output.height);
        output.style.width = '360px';
        output.style.height = 360 * output.height / output.width + 'px'; 
    }
    img2.src = img.src;  

    document.getElementById('file').onchange=function(){   
           var filereader = new FileReader();
           filereader.onload = function(e) { 
                 document.getElementById('convert').disabled = false;
                document.getElementById('convert').innerHTML = '<a>Convert</a>';
                document.getElementById('dlbtn').disabled = true;
               var img = new Image();
               img.onload = function() {    
                    c.width = img.naturalWidth;
                    c.height = img.naturalHeight; 
                    context.drawImage(img, 0, 0, c.width, c.height);
                    c.style.width = '360px';
                    c.style.height = 360 * c.height / c.width + 'px';  //re-initialize
               }  // Set src from upload, original byte sequence   
               
               var img2 = new Image();
               img2.onload = function(){  
                   output.width = img2.naturalWidth;
                   output.height = img2.naturalHeight;
                   outputImage.drawImage(img2, 0, 0, output.width, output.height);
                   output.style.width = '360px';
                   output.style.height = 360 * output.height / output.width + 'px'; 
               }  // re-initialize
               img2.src = img.src = e.target.result; 
           };
           filereader.readAsDataURL(this.files[0]); 
       }

 
 
    function provia() {  
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () { 
              this.reloadCanvasData(); 
              this.exposure(12);
              this.saturation(5);
              this.noise(4); 
              this.curves('r', [0, 0], [44, 18], [115, 121], [179, 200], [255, 255]);
              this.curves('g', [0, 0], [43, 22], [114, 121], [177, 204], [219, 236], [255, 255]);
              this.curves('b', [0, 0], [43, 21], [112, 122], [176, 204], [255, 255]); 
              this.render(
                    function() {
                    document.getElementById('dlbtn').disabled = false;
                    document.getElementById('convert').innerHTML = 'Rendered';
                }); 
            }); 
            document.getElementById('convert').disabled = true;
    }

    function download() {
    var dt = output.toDataURL('image/jpeg', .92);
    this.href = dt; //this may not work in the future..
    }

    document.getElementById('download').addEventListener('click', download, false);
    document.getElementById('convert').addEventListener('click', provia, false);
