 
    var c = document.getElementById('myCanvas'),
    context = c.getContext('2d'); 
    var output = document.getElementById('myOutput'),
    outputImage = output.getContext('2d'); 
    document.getElementById('dlbtn').disabled = true;
/* initialize canvas */
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


/* events  */
    var filter;  
    var buttons = document.querySelectorAll('.filter'); 
    var buttonsCount = buttons.length;
    for (i = 0; i < buttonsCount; i++) { 
        buttons[i].onclick = function(e) {
            outputImage.clearRect(0, 0, output.width, output.height);
            img2.onload = function(){ 
                Caman("#myOutput", function(){ 
                  this.resetOriginalPixelData();
                }); 
                output.width = img2.naturalWidth;
                output.height = img2.naturalHeight;
                outputImage.drawImage(img2, 0, 0, output.width, output.height);
                output.style.width = '360px';
                output.style.height = 360 * output.height / output.width + 'px'; 
            }
            img2.src = img.src;   
            $('.filter').not(this).removeClass('selected');
            filter = this.id; 
            this.classList.add('selected'); 
            document.getElementById('dlbtn').disabled = true;
            window[filter]();
            Caman("#myOutput", function(){  
              this.reloadCanvasData();
            }); 
        }; 
    } 




    document.getElementById('file').onchange=function(){    
           var filereader = new FileReader();
           filereader.onload = function(e) { 
                 document.getElementById('convert').disabled = false;
                document.getElementById('convert').innerHTML = '<a>Convert</a>';
                document.getElementById('dlbtn').disabled = true;
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
                Caman("#myOutput", function(){  
                  this.reloadCanvasData();
                }); 
           };
           filereader.readAsDataURL(this.files[0]);   
       }

 

/* functions */ 
    function refresh() { 
            Caman("#myOutput", function(){ 
              this.resetOriginalPixelData();
              this.reloadCanvasData();
            }); 
    }

    function provia() {  
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () { 
              refresh();
              this.exposure(12);
              this.saturation(5);
              this.noise(3); 
              this.curves('r', [0, 0], [44, 18], [115, 121], [255, 255]);
              this.curves('g', [0, 0], [43, 22], [114, 121], [255, 255]);
              this.curves('b', [0, 0], [43, 21], [112, 122], [255, 255]); 
              this.render(
                    function() {
                    document.getElementById('dlbtn').disabled = false;
                    document.getElementById('convert').innerHTML = 'Rendered';
                }); 
            }); 
            document.getElementById('convert').disabled = true;
    }

    function vista() {
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () { 
              refresh();
              this.noise(3); 
              this.curves('r', [0, 0], [42, 9], [78, 45], [126, 122], [182, 204], [255, 255]);
              this.curves('g', [0, 0], [36, 10], [76, 46], [124, 122], [181, 201], [219, 230], [255, 255]);
              this.curves('b', [0, 0], [36, 10], [76, 46], [122, 118], [183, 206], [222, 235], [255, 255]); 
              this.render(
                    function() {
                    document.getElementById('dlbtn').disabled = false;
                    document.getElementById('convert').innerHTML = 'Rendered';
                }); 
            }); 
            document.getElementById('convert').disabled = true;
    }

    function astia() {
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () {  
              refresh();
              this.saturation(5);
              this.noise(3); 
              this.curves('r', [0, 0], [41, 25], [118, 124], [185, 195], [255, 255]);
              this.curves('g', [0, 0], [40, 25], [119, 125], [182, 199], [255, 255]);
              this.curves('b', [0, 0], [40, 26], [119, 124], [181, 200], [255, 255]); 
              this.render(
                    function() {
                    document.getElementById('dlbtn').disabled = false;
                    document.getElementById('convert').innerHTML = 'Rendered';
                }); 
            }); 
            document.getElementById('convert').disabled = true;
    }

    function neopan() { 
           document.getElementById('convert').innerHTML = 'Rendering...';
           Caman("#myOutput", function () { 
              refresh();
             this.greyscale();
             this.contrast(7); 
             this.noise(5); 
             this.curves('rgb', [0, 5], [17, 18], [85, 85], [255, 251]); 
             this.render(
                   function() {
                   document.getElementById('dlbtn').disabled = false;
                   document.getElementById('convert').innerHTML = 'Rendered';
               }); 
           }); 
           document.getElementById('convert').disabled = true;
    }

    function greys() { 
           document.getElementById('convert').innerHTML = 'Rendering...';
           Caman("#myOutput", function () {  
              refresh();
             this.greyscale();
             this.curves('rgb', [0, 0], [255, 255]); 
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
    document.getElementById('convert').addEventListener('click', function(){
      if (filter) {
        window[filter]();
      } else {
        provia();
      }
    }, false);

