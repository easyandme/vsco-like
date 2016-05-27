 
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
            var img2 = new Image();
            img2.onload = function(){ 
                  output.width = img2.naturalWidth;
                  output.height = img2.naturalHeight;
                  outputImage.drawImage(img2, 0, 0, output.width, output.height);
                  output.style.width = '360px';
                  output.style.height = 360 * output.height / output.width + 'px'; 
                  window[filter](); 
            }
            img2.src = img.src;   
            $('.filter').not(this).removeClass('selected');
            filter = this.id; 
            this.classList.add('selected'); 
            document.getElementById('dlbtn').disabled = true;
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

    function kodak() {
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () { 
              refresh(); 
              this.saturation(-10);
              this.noise(5); 
              this.curves('rgb', [0, 47], [43, 54], [79, 75], [134, 133], [189, 188], [255, 245]); 
              this.curves('r', [0, 0], [33, 13], [82, 64], [173, 202], [255, 255]);
              this.curves('g', [0, 0], [33, 31], [83, 74], [113, 120], [177, 200], [255, 255]);
              this.curves('b', [0, 0], [80, 62], [114, 121], [177, 199], [255, 255]); 
              this.render(
                    function() {
                    document.getElementById('dlbtn').disabled = false;
                    document.getElementById('convert').innerHTML = 'Rendered';
                }); 
            }); 
            document.getElementById('convert').disabled = true;
    }

    function royal() { 
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () { 
              refresh();  
              this.noise(4); 
              this.curves('rgb', [0, 12], [77, 74], [131, 133], [184, 178], [227, 205], [253, 231]); 
              this.curves('r', [0, 0], [35, 14], [66, 46], [121, 124], [184, 198], [255, 255]);
              this.curves('g', [0, 0], [44, 25], [120, 124], [183, 199], [217, 226], [255, 255]);
              this.curves('b', [0, 0], [32, 18], [76, 61], [118, 125], [220, 223], [255, 248]); 
              this.render(
                    function() {
                    document.getElementById('dlbtn').disabled = false;
                    document.getElementById('convert').innerHTML = 'Rendered';
                }); 
            }); 
            document.getElementById('convert').disabled = true;
    }

    function vistawarm() { 
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () { 
              refresh();  
              this.noise(5); 
              this.saturation(-5);
              this.channels({
                  red: 8,
                  green: 0,
                  blue: -8,
              })
              this.curves('rgb', [0, 48], [77, 76], [133, 133], [189, 187], [255, 245]); 
              this.curves('r', [0, 0], [30, 16], [75, 64], [113, 122], [174, 197], [255, 255]);
              this.curves('g', [0, 0], [32, 11], [114, 120], [178, 200], [255, 255]);
              this.curves('b', [0, 0], [80, 49], [121, 119], [174, 194], [255, 255]); 
              this.render(
                    function() {
                    document.getElementById('dlbtn').disabled = false;
                    document.getElementById('convert').innerHTML = 'Rendered';
                }); 
            }); 
            document.getElementById('convert').disabled = true;
    }

    function polaroid() { 
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () { 
              refresh();  
              this.saturation(-10);
              this.channels({
                  red: -5,
                  green: -8,
                  blue: -10,
              })
              this.curves('rgb', [0, 54], [48, 74], [161, 165], [255, 248]); 
              this.curves('r', [0, 29], [36, 44], [118, 118], [176, 187], [227, 234], [255, 255]);
              this.curves('g', [0, 27], [29, 39], [123, 116], [166, 174], [214, 229], [255, 255]);
              this.curves('b', [0, 0], [49, 27], [115, 118], [181, 201], [255, 232]); 
              this.render(
                    function() {
                    document.getElementById('dlbtn').disabled = false;
                    document.getElementById('convert').innerHTML = 'Rendered';
                }); 
            }); 
            document.getElementById('convert').disabled = true;
    }

    function fujih() { 
            document.getElementById('convert').innerHTML = 'Rendering...';
            Caman("#myOutput", function () { 
              refresh();  
              this.saturation(5);
              this.channels({
                  red: 5,
                  green: 4,
                  blue: -7,
              })
              this.noise(3);
              this.curves('rgb', [0, 21], [65, 72], [173, 174], [255, 255]); 
              this.curves('r', [1, 4], [46, 39], [115, 127], [188, 199], [255, 255]);
              this.curves('g', [0, 6], [44, 36], [116, 129], [144, 158], [188, 196], [255, 252]);
              this.curves('b', [0, 0], [50, 36], [118, 129], [190, 198], [255, 250]); 
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
              this.noise(2); 
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

