(function() {

    //tworzenie kanwy

    const mandelbrotCanvas = document.createElement('canvas');
    const body = document.querySelector('body');
    mandelbrotCanvas.width = 600;
    mandelbrotCanvas.height = 600;
    body.appendChild(mandelbrotCanvas);
    const ctx = mandelbrotCanvas.getContext('2d');

/*    const xZoomSlider = document.createElement('form');
    const yZoomSlider = document.createElement('form');

    const rangeInputX = document.createElement('input');
    const rangeInputY = document.createElement('input');

    rangeInputX.setAttribute("type", "range");
    rangeInputY.setAttribute("type", "range");

    xZoomSlider.appendChild(rangeInputX);
    yZoomSlider.appendChild(rangeInputY);

    body.appendChild(xZoomSlider);
    body.appendChild(yZoomSlider);*/
    
    //warunek sprawdzający czy wygenerowana liczba należy do zbioru mandelbrota

    function checkIfMandelbrotSet(x, y) {
        let mainRealComponent = x;
        let mainImaginaryComponent = y;
        let maxIterations = 100; //liczba iteracji

        for(let i = 0; i < maxIterations; i++) {
            //Obliczanie realnych i wyimaginowanych składników liczby Z

            //Zastosowanie tymczasowych zmiennych w celu przepisania wartośći
            let tempRealComponent = mainRealComponent * mainRealComponent
                                    - mainImaginaryComponent * mainImaginaryComponent
                                    + x;
            //Zastosowanie tymczasowych zmiennych w celu przepisania wartośći                      
            let tempImaginaryComponent = 2 * mainRealComponent * mainImaginaryComponent
                                    + y;

            //przypisanie wartości do realnej części

            mainRealComponent = tempRealComponent;

            //przypisanie wartości do części urojonej

            mainImaginaryComponent = tempImaginaryComponent;

            
            if (mainRealComponent * mainRealComponent + mainImaginaryComponent * mainImaginaryComponent > 16)
                return (i/maxIterations * 100);
        }


        return 0; 
}
/*function drawMandelbrot(){
     for(let x=0; x < mandelbrotCanvas.width; x++) {
        for(let y=0; y < mandelbrotCanvas.height; y++) {
            let belongsToSet = 
                    checkIfMandelbrotSet(x/magnificationFactor - panX, 
                                                y/magnificationFactor - panY);
            if(belongsToSet === 0) {
                    ctx.fillStyle = '#000';
                    ctx.fillRect(x,y, 1,1); // Rysowanie czarnego pixela
            }
            else{
                ctx.fillStyle = `hsl(0, 100%, ${belongsToSet}%)`;
                ctx.fillRect(x,y, 1,1); // Rysowanie kolorowego pixela
            }                
        } 
    }

}
    //rysowanie zawartości kanwy

    var magnificationFactor = 200; //powiększenie
    var panX = 2,
        panY = 2;

    rangeInputX.addEventListener('input',()=>{
        panX = rangeInputX.value / 100;
        drawMandelbrot();
    },false);
    rangeInputY.addEventListener('input',()=>{
        panY = rangeInputY.value / 100;
        drawMandelbrot();
    },false);
*/


//  let magnificationFactor = 3000; // ZOOM
//     let panX = 0.65,
//         panY = 0.72;
    let magnificationFactor = 200; //NORMAL
    let panX = 1.8,
        panY = 1.6;

 for(let x=0; x < mandelbrotCanvas.width; x++) {
        for(let y=0; y < mandelbrotCanvas.height; y++) {
            let belongsToSet = 
                    checkIfMandelbrotSet(x/magnificationFactor - panX, 
                                                y/magnificationFactor - panY);
            if(belongsToSet === 0) {
                    ctx.fillStyle = '#000';
                    ctx.fillRect(x,y, 1,1); // Rysowanie czarnego pixela
            }
            else{
                ctx.fillStyle = `hsl(35, 100%, ${belongsToSet}%)`;
                ctx.fillRect(x,y, 1,1); // Rysowanie kolorowego pixela
            }                
        } 
    }


})();